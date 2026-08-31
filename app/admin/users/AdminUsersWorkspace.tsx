"use client";
import { FormEvent, useCallback, useEffect, useState } from "react";
import AdminNavbar from "../AdminNavbar";

type AdminUser = { id:string; name:string; email:string; role:"SUPER_ADMIN"|"ADMIN"|"EDITOR"; isActive:boolean; lastLoginAt:string|null; createdAt:string };
const initialForm = { name:"", email:"", password:"", role:"ADMIN" as "ADMIN"|"EDITOR" };

export default function AdminUsersWorkspace() {
  const [users,setUsers]=useState<AdminUser[]>([]), [currentUserId,setCurrentUserId]=useState("");
  const [form,setForm]=useState(initialForm), [loading,setLoading]=useState(true), [saving,setSaving]=useState(false), [pendingId,setPendingId]=useState("");
  const [notice,setNotice]=useState<{type:"success"|"error";text:string}|null>(null);
  const loadUsers=useCallback(async()=>{ setLoading(true); try { const response=await fetch("/api/admin/users",{cache:"no-store"}); const data=await response.json(); if(!response.ok) throw new Error(data.error||"Unable to load admin users."); setUsers(data.users||[]); setCurrentUserId(data.currentUserId||""); } catch(error){ setNotice({type:"error",text:(error as Error).message}); } finally { setLoading(false); } },[]);
  useEffect(()=>{void loadUsers()},[loadUsers]);

  async function createUser(event:FormEvent<HTMLFormElement>){ event.preventDefault(); setSaving(true); setNotice(null); try { const response=await fetch("/api/admin/users",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(form)}); const data=await response.json(); if(!response.ok) throw new Error(data.error||"Unable to create the admin account."); setUsers(current=>[data.user,...current]); setForm(initialForm); setNotice({type:"success",text:`${data.user.name}'s admin account was created.`}); } catch(error){setNotice({type:"error",text:(error as Error).message})} finally{setSaving(false)} }
  async function toggleUser(user:AdminUser){ setPendingId(user.id); setNotice(null); try { const response=await fetch("/api/admin/users",{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:user.id,isActive:!user.isActive})}); const data=await response.json(); if(!response.ok) throw new Error(data.error||"Unable to update the account."); setUsers(current=>current.map(item=>item.id===data.user.id?data.user:item)); setNotice({type:"success",text:`${data.user.name}'s account is now ${data.user.isActive?"active":"inactive"}.`}); } catch(error){setNotice({type:"error",text:(error as Error).message})} finally{setPendingId("")} }

  const inputClass="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-950 outline-none transition focus:border-cyan-600 focus:ring-2 focus:ring-cyan-100";
  return <main className="min-h-screen bg-slate-100 px-4 py-4 font-sans sm:px-7 sm:pb-24">
    <AdminNavbar activeTab="users" />
    <div className="mx-auto grid w-full max-w-7xl gap-6 lg:grid-cols-[380px_minmax(0,1fr)]">
      <section className="h-fit rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-cyan-700">Access control</p><h1 className="mt-2 text-2xl font-extrabold text-slate-950">Create admin user</h1>
        <p className="mt-2 text-sm leading-6 text-slate-600">Add a secure account for a team member. Credentials and status are stored in PostgreSQL.</p>
        <form className="mt-6 space-y-4" onSubmit={createUser}>
          <label className="block text-sm font-semibold text-slate-700">Full name<input required minLength={2} maxLength={100} autoComplete="name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} className={inputClass}/></label>
          <label className="block text-sm font-semibold text-slate-700">Email address<input required type="email" maxLength={254} autoComplete="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} className={inputClass}/></label>
          <label className="block text-sm font-semibold text-slate-700">Temporary password<input required type="password" minLength={12} maxLength={128} autoComplete="new-password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} className={inputClass}/><span className="mt-1.5 block text-xs font-normal text-slate-500">12+ characters with uppercase, lowercase, and a number.</span></label>
          <label className="block text-sm font-semibold text-slate-700">Access level<select value={form.role} onChange={e=>setForm({...form,role:e.target.value as "ADMIN"|"EDITOR"})} className={inputClass}><option value="ADMIN">Administrator</option><option value="EDITOR">Content editor</option></select></label>
          <button disabled={saving} className="w-full rounded-xl bg-[#17233d] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#223353] disabled:cursor-not-allowed disabled:opacity-60">{saving?"Creating account...":"Create admin account"}</button>
        </form>
      </section>
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-end justify-between gap-3 border-b border-slate-200 pb-5"><div><p className="text-xs font-bold uppercase tracking-[0.16em] text-cyan-700">Team access</p><h2 className="mt-2 text-2xl font-extrabold text-slate-950">Admin users</h2></div><span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">{users.length} accounts</span></div>
        {notice&&<div role="status" className={`mt-5 rounded-xl border px-4 py-3 text-sm font-semibold ${notice.type==="success"?"border-cyan-200 bg-cyan-50 text-cyan-900":"border-rose-200 bg-rose-50 text-rose-800"}`}>{notice.text}</div>}
        {loading?<p className="py-12 text-center text-sm font-semibold text-slate-500">Loading admin users...</p>:<div className="mt-5 space-y-3">{users.map(user=><article key={user.id} className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-slate-200 p-4"><div className="min-w-0"><div className="flex flex-wrap items-center gap-2"><h3 className="font-bold text-slate-950">{user.name}</h3>{user.id===currentUserId&&<span className="rounded-full bg-cyan-50 px-2 py-0.5 text-[10px] font-bold uppercase text-cyan-800">You</span>}</div><p className="truncate text-sm text-slate-600">{user.email}</p><p className="mt-1 text-xs text-slate-500">{user.role.replace("_"," ")} · Created {new Date(user.createdAt).toLocaleDateString("en-IN",{dateStyle:"medium"})}{user.lastLoginAt?` · Last login ${new Date(user.lastLoginAt).toLocaleDateString("en-IN",{dateStyle:"medium"})}`:" · Never signed in"}</p></div><div className="flex items-center gap-3"><span className={`rounded-full px-2.5 py-1 text-[10px] font-extrabold uppercase ${user.isActive?"bg-cyan-50 text-cyan-800":"bg-slate-200 text-slate-700"}`}>{user.isActive?"Active":"Inactive"}</span>{user.role!=="SUPER_ADMIN"&&user.id!==currentUserId&&<button type="button" disabled={pendingId===user.id} onClick={()=>void toggleUser(user)} className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-bold text-slate-700 transition hover:bg-slate-100 disabled:opacity-50">{pendingId===user.id?"Saving...":user.isActive?"Deactivate":"Activate"}</button>}</div></article>)}</div>}
      </section>
    </div>
  </main>;
}
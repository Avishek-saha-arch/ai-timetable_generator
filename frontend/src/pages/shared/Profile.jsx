import React from 'react';
import { Camera, Mail, Phone, ShieldCheck, Activity, CalendarDays } from 'lucide-react';
import PageHeader from '../../components/ui/PageHeader';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import useAppStore from '../../store/useAppStore';

const Profile = () => {
  const { currentUser } = useAppStore();

  return (
    <div className="space-y-6">
      <PageHeader title="My Profile" description="Manage your personal information." />
      <Card>
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8">
          <div className="relative">
            <div className="w-28 h-28 rounded-3xl bg-gradient-to-tr from-[#284A50] to-[#52A8AD] text-white flex items-center justify-center font-bold text-4xl shadow-lg shadow-[#284A50]/20">
              {/* {currentUser.avatar} */}
              {currentUser?.name?.charAt(0)?.toUpperCase() || currentUser?.email?.charAt(0).toUpperCase() || 'U'}
            </div>
            {/* <button className="absolute -bottom-2 -right-2 p-2 bg-white rounded-full shadow-md border border-slate-200 text-slate-500">
              <Camera size={16} />
            </button> */}
          </div>
          <div className="flex-1 w-full">
            <h2 className="text-2xl font-bold text-slate-900">{currentUser.name}</h2>
            <p className="text-slate-500 font-semibold mb-6">{currentUser.role}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Full Name</label>
                <input defaultValue={currentUser.name} className="w-full mt-1.5 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold outline-none focus:ring-2 focus:ring-[#284A50]/50" />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Email</label>
                <div className="relative mt-1.5">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input defaultValue={currentUser.email} className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm font-semibold outline-none focus:ring-2 focus:ring-[#284A50]/50" />
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Phone</label>
                <div className="relative mt-1.5">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input placeholder="+1 (555) 000-0000" className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm font-semibold outline-none focus:ring-2 focus:ring-[#284A50]/50" />
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Role</label>
                <input disabled defaultValue={currentUser.role} className="w-full mt-1.5 bg-slate-100 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-500" />
              </div>
            </div>
            <Button className="mt-6">Save Changes</Button>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap gap-6 items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600"><ShieldCheck size={20} /></div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Account Status</p>
              <p className="font-bold text-emerald-600">Verified</p>
            </div>
          </div>
          {/* <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#284A50]/10 flex items-center justify-center text-[#284A50]"><Activity size={20} /></div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Member Since</p>
              <p className="font-bold text-[#284A50]">2024</p>
            </div>
          </div> */}
          {/* <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-amber-500"><CalendarDays size={20} /></div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Last Login</p>
              <p className="font-bold text-amber-600">Today</p>
            </div> 
          </div>*/}
        </div>
      </Card>
    </div>
  );
};

export default Profile;

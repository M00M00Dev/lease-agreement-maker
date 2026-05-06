"use client";

import React, { useState, useEffect } from 'react';
import {
  Download,
  Home,
  User,
  CreditCard,
  Calendar,
  FileText
} from 'lucide-react';

const PREMISES = [
  { id: 'JL', name: 'JL Home', address: '41 Jillian Street Cranbourne VIC 3977', postcode: '3977' },
  { id: 'CF', name: 'CF Home', address: '7/13 Cliff Road Frankston VIC 3199', postcode: '3199' },
  { id: 'LD', name: 'LD Home', address: '120 Lindrum Rd. Frankston VIC 3199', postcode: '3199' },
  { id: 'MR', name: 'MR Home', address: '1218 Toorak Rd. Camberwell VIC 3124', postcode: '3124' }
];

const BANK_ACCOUNTS = [
  { id: 'JL', name: 'JL Account', details: 'BSB 013257, ACC 528042647' },
  { id: 'MR', name: 'MR Account', details: 'BSB 013711, ACC 333094113' },
  { id: 'LD', name: 'LD Account', details: 'BSB 013711, ACC 333094068' },
  { id: 'Bunjob', name: 'Bunjob Account', details: 'BSB 013437, ACC 654057313' }
];

const App = () => {
  const [formData, setFormData] = useState({
    agreementDate: new Date().toISOString().split('T')[0],
    landlordName: 'Chai Poovaviranon',
    landlordAddress: '41 Jillian Street Cranbourne VIC 3977',
    landlordEmail: 'Chai.PVRN@gmail.com',
    premiseId: 'JL',
    bankId: 'JL',
    tenant1Name: '',
    tenant1Address: '',
    tenant1Email: '',
    rentAmount: '248.00',
    rentFrequency: 'Weekly',
    rentFirstDue: '',
    bondAmount: '496.00',
    bondDue: '',
    isBondLodged: true,
    periodMonths: '3',
    startDate: '',
    endDate: '',
    emergencyContact: '0401069095'
  });

  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (formData.startDate && formData.periodMonths) {
      const start = new Date(formData.startDate);
      const months = parseInt(formData.periodMonths);
      if (!isNaN(months)) {
        const end = new Date(start);
        end.setMonth(start.getMonth() + months);
        setFormData(prev => ({ ...prev, endDate: end.toISOString().split('T')[0] }));
      }
    }
  }, [formData.startDate, formData.periodMonths]);

  const handleInputChange = (e: any) => {
    const { name, value, type } = e.target;
    const checked = e.target.checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const selectedPremise = PREMISES.find(p => p.id === formData.premiseId) || PREMISES[0];
  const selectedBank = BANK_ACCOUNTS.find(b => b.id === formData.bankId) || BANK_ACCOUNTS[0];

  const handleDownload = () => {
    setIsGenerating(true);
    
    const element = document.getElementById('agreement-document');
    if (!element) { setIsGenerating(false); return; }

    const originalShadow = element.style.boxShadow;
    const originalBorder = element.style.border;
    element.style.boxShadow = 'none';
    element.style.border = 'none';

    const generatePDF = () => {
      const opt = {
        margin: 15,
        filename: `Lease_Agreement_${formData.tenant1Name.replace(/\s+/g, '_') || 'Draft'}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };

      const win = (window as any);
      if (win.html2pdf) {
        win.html2pdf().set(opt).from(element).save().then(() => {
          if (element) { element.style.boxShadow = originalShadow; element.style.border = originalBorder; }
          setIsGenerating(false);
        }).catch((err: any) => {
          console.error("PDF Generation Error", err);
          if (element) { element.style.boxShadow = originalShadow; element.style.border = originalBorder; }
          setIsGenerating(false);
        });
      }
    };

    const winCheck = (window as any);
    if (winCheck.html2pdf) {
      generatePDF();
    } else {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
      script.onload = generatePDF;
      document.body.appendChild(script);
    }
  };

  const todayFormatted = new Date().toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <div className="min-h-screen bg-slate-100 py-12 font-sans text-slate-800">
      <header className="max-w-6xl mx-auto px-4 mb-8 flex justify-between items-end print:hidden">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 mb-2 flex items-center gap-3">
            <FileText className="text-blue-600" /> Lease Agreement Maker
          </h1>
          <p className="text-slate-500 font-medium">Residential Tenancies Act 1997 (VIC)</p>
        </div>
        
        <button 
          type="button" 
          onClick={handleDownload} 
          disabled={isGenerating}
          className={`text-white px-8 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg ${isGenerating ? 'bg-slate-400 cursor-wait' : 'bg-blue-600 hover:bg-blue-500'}`}
        >
          <Download size={20} className={isGenerating ? 'animate-bounce' : ''} />
          {isGenerating ? 'Generating PDF...' : 'Download PDF'}
        </button>
      </header>

      <main className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* INPUT FORM PANE */}
        <div className="lg:col-span-5 space-y-6 print:hidden">
          <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h2 className="text-sm font-bold mb-4 flex items-center gap-2 text-slate-500 uppercase tracking-widest"><Home size={16} /> 1. Property & Payment</h2>
            <div className="space-y-4">
              <select name="premiseId" value={formData.premiseId} onChange={handleInputChange} className="w-full p-3 bg-slate-50 border rounded-xl">
                {PREMISES.map(p => <option key={p.id} value={p.id}>{p.name} — {p.address}</option>)}
              </select>
              <select name="bankId" value={formData.bankId} onChange={handleInputChange} className="w-full p-3 bg-slate-50 border rounded-xl">
                {BANK_ACCOUNTS.map(b => <option key={b.id} value={b.id}>{b.name} ({b.details})</option>)}
              </select>
              <div className="grid grid-cols-2 gap-4">
                <input type="date" name="agreementDate" value={formData.agreementDate} onChange={handleInputChange} className="p-3 bg-slate-50 border rounded-xl" />
                <input type="text" name="emergencyContact" value={formData.emergencyContact} onChange={handleInputChange} className="p-3 bg-slate-50 border rounded-xl" />
              </div>
            </div>
          </section>

          <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h2 className="text-sm font-bold mb-4 flex items-center gap-2 text-slate-500 uppercase tracking-widest"><User size={16} /> 2. Tenant Information</h2>
            <div className="space-y-4">
              <input type="text" name="tenant1Name" placeholder="Full Name" value={formData.tenant1Name} onChange={handleInputChange} className="w-full p-3 bg-slate-50 border rounded-xl" />
              <input type="text" name="tenant1Address" placeholder="Current Address" value={formData.tenant1Address} onChange={handleInputChange} className="w-full p-3 bg-slate-50 border rounded-xl" />
              <input type="email" name="tenant1Email" placeholder="Email" value={formData.tenant1Email} onChange={handleInputChange} className="w-full p-3 bg-slate-50 border rounded-xl" />
            </div>
          </section>

          <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h2 className="text-sm font-bold mb-4 flex items-center gap-2 text-slate-500 uppercase tracking-widest"><CreditCard size={16} /> 3. Financial Terms</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input type="text" name="rentAmount" placeholder="Weekly Rent ($)" value={formData.rentAmount} onChange={handleInputChange} className="p-3 bg-slate-50 border rounded-xl" />
                <select name="rentFrequency" value={formData.rentFrequency} onChange={handleInputChange} className="p-3 bg-slate-50 border rounded-xl">
                  <option value="Weekly">Weekly</option>
                  <option value="Fortnightly">Fortnightly</option>
                  <option value="Monthly">Monthly</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input type="text" name="bondAmount" placeholder="Bond ($)" value={formData.bondAmount} onChange={handleInputChange} className="p-3 bg-slate-50 border rounded-xl" />
                <input type="date" name="bondDue" value={formData.bondDue} onChange={handleInputChange} className="p-3 bg-slate-50 border rounded-xl" />
              </div>
              
              {/* RTBA Checkbox is here */}
              <div className="flex items-center gap-2 p-2 bg-slate-50 border rounded-lg">
                <input type="checkbox" id="isBondLodged" name="isBondLodged" checked={formData.isBondLodged} onChange={handleInputChange} className="w-4 h-4" />
                <label htmlFor="isBondLodged" className="text-xs font-bold text-slate-700 uppercase cursor-pointer">Submit bond to RTBA</label>
              </div>
              
              <input type="date" name="rentFirstDue" value={formData.rentFirstDue} onChange={handleInputChange} className="w-full p-3 bg-slate-50 border rounded-xl" />
            </div>
          </section>

          <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h2 className="text-sm font-bold mb-4 flex items-center gap-2 text-slate-500 uppercase tracking-widest"><Calendar size={16} /> 4. Tenure Timeline</h2>
            <div className="space-y-4">
              <input type="number" name="periodMonths" placeholder="Months" value={formData.periodMonths} onChange={handleInputChange} className="w-full p-3 bg-slate-50 border rounded-xl" />
              <div className="grid grid-cols-2 gap-4">
                <input type="date" name="startDate" value={formData.startDate} onChange={handleInputChange} className="p-3 bg-slate-50 border rounded-xl" />
                <input type="date" name="endDate" value={formData.endDate} readOnly className="p-3 bg-blue-50 border border-blue-200 rounded-xl font-bold" />
              </div>
            </div>
          </section>
        </div>

        {/* PDF PREVIEW PANE */}
        <div id="agreement-document" className="lg:col-span-7 bg-white p-12 shadow-2xl rounded-sm border border-slate-200 min-h-[1000px]">
          <div className="border-b-[3px] border-slate-900 pb-6 mb-8">
            <h1 className="text-3xl font-black uppercase tracking-tighter text-slate-900">Residential Tenancy Agreement</h1>
            <p className="text-sm font-bold text-slate-800">Residential Tenancies Act 1997 Section 26 (VIC)</p>
          </div>

          <div className="text-[11.5pt] leading-relaxed space-y-6 font-serif">
            <div className="p-4 bg-slate-50 border border-slate-300 rounded mb-8">
              <p className="font-bold text-xs uppercase mb-1">Agreement Date</p>
              <p className="text-xl font-bold border-b-2 border-dotted pb-1">{formData.agreementDate ? new Date(formData.agreementDate).toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' }) : '___/___/202_'}</p>
            </div>

            <div className="grid grid-cols-2 gap-12 pt-4">
              <div className="space-y-3">
                <h3 className="font-black border-b-2 border-slate-900 text-xs uppercase tracking-widest">1. LANDLORD</h3>
                <p className="font-bold">{formData.landlordName}</p>
                <p className="text-sm">{formData.landlordAddress}</p>
              </div>
              <div className="space-y-3">
                <h3 className="font-black border-b-2 border-slate-900 text-xs uppercase tracking-widest">2. TENANT(S)</h3>
                <p className="font-bold">{formData.tenant1Name || '[Enter Tenant Name]'}</p>
                <p className="text-sm">{formData.tenant1Address || '[Enter Address]'}</p>
              </div>
            </div>

            <div className="mt-10">
              <h3 className="font-bold border-b mb-3 text-sm uppercase">3. PREMISES</h3>
              <p className="font-bold text-lg p-3 bg-yellow-50 border-l-4 border-yellow-500">{selectedPremise.address}</p>
            </div>

            <div className="mt-8 border-2 p-6 rounded-lg bg-slate-50">
              <h3 className="font-black mb-4 uppercase text-xs">4. RENT & PAYMENT TERMS</h3>
              <div className="grid grid-cols-2 gap-8">
                <p className="font-black text-2xl text-blue-800">${formData.rentAmount} <span className="text-sm font-normal">per {formData.rentFrequency}</span></p>
                <p className="font-bold text-lg">{formData.rentFirstDue ? new Date(formData.rentFirstDue).toLocaleDateString('en-AU') : 'TBD'}</p>
              </div>
              <div className="bg-white border-2 border-blue-100 p-4 mt-4 rounded-md">
                <p className="font-bold">Account Name: <span className="text-blue-700">Chai P.</span></p>
                <p className="font-mono text-sm">{selectedBank.details}</p>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-10">
              <div>
                <h3 className="font-bold border-b mb-2 text-sm uppercase">5. BOND</h3>
                <p className="font-black text-lg underline">${formData.bondAmount}</p>
                
                {/* RTBA Render Logic is here */}
                {formData.isBondLodged && <p className="text-xs text-slate-600">Paid to landlord and lodged with the RTBA within 10 business days.</p>}
              
              </div>
              <div>
                <h3 className="font-bold border-b mb-2 text-sm uppercase">6. BOND DUE</h3>
                <p className="font-bold">{formData.bondDue ? new Date(formData.bondDue).toLocaleDateString('en-AU') : '___/___/___'}</p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t-[3px] border-slate-900">
              <h3 className="font-black mb-6 uppercase text-lg">Schedule: Specific Terms</h3>
              <ul className="space-y-4 text-sm list-decimal pl-5">
                <li>Utility monthly cap is <span className="font-bold">$400.00</span>; excess shared by all tenants.</li>
                <li><span className="font-black uppercase text-red-600">No footwear</span> inside the house at any time.</li>
                <li>Strictly NO PETS, NO SMOKING, NO PARTIES, and NO DRUGS.</li>
              </ul>
            </div>

            <div className="mt-20 grid grid-cols-2 gap-20">
              <div>
                <div className="h-16 border-b-2 border-slate-900 mb-2"></div>
                <p className="text-[10px] font-black uppercase">Landlord Signature</p>
              </div>
              <div>
                <div className="h-16 border-b-2 border-slate-900 mb-2 flex items-end px-2 font-bold">{todayFormatted}</div>
                <p className="text-[10px] font-black uppercase">Date of Execution</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
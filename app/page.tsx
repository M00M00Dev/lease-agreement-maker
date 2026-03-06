"use client";
import React, { useState, useRef } from 'react';
import { Download, Printer, Home, User, CreditCard, Calendar, FileText, CheckCircle } from 'lucide-react';

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
    rentFrequency: 'Fortnightly',
    rentFirstDue: '',
    bondAmount: '496.00',
    bondDue: '',
    periodMonths: '3',
    startDate: '',
    endDate: '',
    emergencyContact: '0401069095'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const selectedPremise = PREMISES.find(p => p.id === formData.premiseId) || PREMISES[0];
  const selectedBank = BANK_ACCOUNTS.find(b => b.id === formData.bankId) || BANK_ACCOUNTS[0];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header - Hidden on Print */}
      <header className="bg-slate-900 text-white p-6 shadow-lg mb-8 print:hidden">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <FileText className="text-blue-400" />
              Lease Agreement Maker
            </h1>
            <p className="text-slate-400 text-sm">Residential Tenancies Act 1997 Section 26 (VIC)</p>
          </div>
          <button 
            onClick={handlePrint}
            className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-lg font-medium flex items-center justify-center gap-2 transition-all"
          >
            <Download size={18} />
            Download / Print PDF
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Form Section - Hidden on Print */}
        <div className="lg:col-span-5 space-y-6 print:hidden">
          <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-slate-800 border-b pb-2">
              <Home size={18} className="text-blue-600" />
              Property & Payment
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Select Premise</label>
                <select 
                  name="premiseId" 
                  value={formData.premiseId} 
                  onChange={handleInputChange}
                  className="w-full p-2 bg-gray-50 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  {PREMISES.map(p => <option key={p.id} value={p.id}>{p.name} - {p.address}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Bank Account for Rent/Bond</label>
                <select 
                  name="bankId" 
                  value={formData.bankId} 
                  onChange={handleInputChange}
                  className="w-full p-2 bg-gray-50 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  {BANK_ACCOUNTS.map(b => <option key={b.id} value={b.id}>{b.name} ({b.details})</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Agreement Date</label>
                  <input type="date" name="agreementDate" value={formData.agreementDate} onChange={handleInputChange} className="w-full p-2 bg-gray-50 border border-gray-300 rounded" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Emergency Contact</label>
                  <input type="text" name="emergencyContact" value={formData.emergencyContact} onChange={handleInputChange} className="w-full p-2 bg-gray-50 border border-gray-300 rounded" />
                </div>
              </div>
            </div>
          </section>

          <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-slate-800 border-b pb-2">
              <User size={18} className="text-blue-600" />
              Tenant Information
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Full Name</label>
                <input type="text" name="tenant1Name" placeholder="Mikhail Vernon" value={formData.tenant1Name} onChange={handleInputChange} className="w-full p-2 bg-gray-50 border border-gray-300 rounded" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Current Address</label>
                <input type="text" name="tenant1Address" placeholder="Queensland" value={formData.tenant1Address} onChange={handleInputChange} className="w-full p-2 bg-gray-50 border border-gray-300 rounded" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Email (Electronic Service)</label>
                <input type="email" name="tenant1Email" placeholder="mickey@example.com" value={formData.tenant1Email} onChange={handleInputChange} className="w-full p-2 bg-gray-50 border border-gray-300 rounded" />
              </div>
            </div>
          </section>

          <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-slate-800 border-b pb-2">
              <CreditCard size={18} className="text-blue-600" />
              Rent & Bond
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Rent Amount ($)</label>
                  <input type="text" name="rentAmount" value={formData.rentAmount} onChange={handleInputChange} className="w-full p-2 bg-gray-50 border border-gray-300 rounded" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Bond Amount ($)</label>
                  <input type="text" name="bondAmount" value={formData.bondAmount} onChange={handleInputChange} className="w-full p-2 bg-gray-50 border border-gray-300 rounded" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">First Rent Due</label>
                  <input type="date" name="rentFirstDue" value={formData.rentFirstDue} onChange={handleInputChange} className="w-full p-2 bg-gray-50 border border-gray-300 rounded" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Bond Due</label>
                  <input type="date" name="bondDue" value={formData.bondDue} onChange={handleInputChange} className="w-full p-2 bg-gray-50 border border-gray-300 rounded" />
                </div>
              </div>
            </div>
          </section>

          <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-slate-800 border-b pb-2">
              <Calendar size={18} className="text-blue-600" />
              Tenancy Period
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Duration (Months)</label>
                <input type="number" name="periodMonths" value={formData.periodMonths} onChange={handleInputChange} className="w-full p-2 bg-gray-50 border border-gray-300 rounded" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Start Date</label>
                  <input type="date" name="startDate" value={formData.startDate} onChange={handleInputChange} className="w-full p-2 bg-gray-50 border border-gray-300 rounded" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">End Date</label>
                  <input type="date" name="endDate" value={formData.endDate} onChange={handleInputChange} className="w-full p-2 bg-gray-50 border border-gray-300 rounded" />
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Preview Section */}
        <div className="lg:col-span-7 bg-white p-8 md:p-12 shadow-2xl rounded-sm border border-gray-200 print:shadow-none print:border-none print:m-0 print:p-0">
          
          {/* Header info */}
          <div className="border-b-2 border-black pb-4 mb-6">
            <h1 className="text-2xl font-bold uppercase tracking-tight">Residential Tenancy Agreement</h1>
            <p className="text-sm font-semibold">Residential Tenancies Act 1997 Section 26</p>
            <p className="text-xs italic mt-1">Residential Tenancies Regulations 2008 – Schedule 1 Form 1</p>
          </div>

          <div className="text-[11pt] leading-relaxed space-y-4 text-gray-900">
            
            <div className="p-3 bg-gray-50 border border-gray-300 mb-6 print:bg-transparent">
              <p className="font-bold">This agreement is made on the day of:</p>
              <p className="text-lg border-b border-dotted border-black px-2">{formData.agreementDate || '___ / ___ / 202_'}</p>
            </div>

            {/* Parties */}
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <h3 className="font-bold border-b border-black text-sm uppercase">Landlord</h3>
                <p className="font-semibold">{formData.landlordName}</p>
                <p className="text-sm">{formData.landlordAddress}</p>
                <p className="text-xs text-gray-600">Email: {formData.landlordEmail}</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-bold border-b border-black text-sm uppercase">Tenant(s)</h3>
                <p className="font-semibold">{formData.tenant1Name || '[Name]'}</p>
                <p className="text-sm">{formData.tenant1Address || '[Address]'}</p>
                <p className="text-xs text-gray-600">Email: {formData.tenant1Email || '[Email]'}</p>
              </div>
            </div>

            {/* 1. Premises */}
            <div className="mt-8">
              <h3 className="font-bold border-b border-black mb-2">1. Premises</h3>
              <p>The landlord lets the premises known as:</p>
              <p className="font-semibold py-1 px-2 bg-yellow-50 border-l-4 border-yellow-400 print:bg-transparent print:border-none">
                {selectedPremise.address}
              </p>
            </div>

            {/* 2. Rent & Payment */}
            <div className="mt-6 border p-4 rounded-sm bg-gray-50 print:bg-transparent">
              <h3 className="font-bold border-b border-black mb-2 uppercase text-sm">2. Rent & Payment Details</h3>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-xs text-gray-600">Rent Amount</p>
                  <p className="font-bold text-lg">${formData.rentAmount} ({formData.rentFrequency})</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">First Payment Due</p>
                  <p className="font-bold">{formData.rentFirstDue || 'Not specified'}</p>
                </div>
              </div>
              <div className="bg-white border p-3 rounded print:bg-transparent">
                <p className="text-xs font-bold text-blue-800 mb-1 uppercase">Payment via Bank Transfer to:</p>
                <p className="font-mono text-sm font-bold">{selectedBank.name}</p>
                <p className="font-mono text-md bg-blue-50 px-2 py-1 inline-block rounded print:bg-transparent">{selectedBank.details}</p>
              </div>
            </div>

            {/* 3. Bond */}
            <div className="mt-6">
              <h3 className="font-bold border-b border-black mb-2">3. Bond</h3>
              <p>The TENANT must pay the bond of <span className="font-bold">${formData.bondAmount}</span> by <span className="font-bold">{formData.bondDue || '___/___/___'}</span>.</p>
              <p className="text-xs mt-1 text-gray-600">The LANDLORD must lodge the bond with the Residential Tenancies Bond Authority (RTBA) within 10 business days.</p>
            </div>

            {/* 4. Period */}
            <div className="mt-6">
              <h3 className="font-bold border-b border-black mb-2">4. Period</h3>
              <p>Fixed period of <span className="font-bold">{formData.periodMonths}</span> months.</p>
              <div className="grid grid-cols-2 gap-4 py-2 italic text-sm">
                <div>Commences on: <span className="font-bold not-italic">{formData.startDate || '___/___/___'}</span></div>
                <div>Ends on: <span className="font-bold not-italic">{formData.endDate || '___/___/___'}</span></div>
              </div>
            </div>

            {/* 4A. Electronic Service */}
            <div className="mt-6 border p-3 text-[10pt] bg-slate-50 print:bg-transparent">
              <h3 className="font-bold border-b border-black mb-2">4A. Consent to electronic service</h3>
              <div className="flex items-start gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border border-black rounded-sm bg-black flex items-center justify-center">
                    <CheckCircle size={12} className="text-white" />
                  </div>
                  <span>Express Consent given by both parties.</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-2 text-xs">
                <p>Tenant Email: {formData.tenant1Email}</p>
                <p>Landlord Email: {formData.landlordEmail}</p>
              </div>
            </div>

            {/* Schedule / Additional Terms */}
            <div className="mt-8 pt-4 border-t-2 border-black">
              <h3 className="font-bold border-b border-black mb-4 uppercase">Schedule: Additional Terms</h3>
              <div className="space-y-4 text-[10pt]">
                <div className="flex gap-2">
                  <span className="font-bold">•</span>
                  <p><span className="font-bold">Rent & Rooms:</span> The rent is for a room on the premise. Payment must be paid on time via bank transfer to the account specified above.</p>
                </div>
                <div className="flex gap-2">
                  <span className="font-bold">•</span>
                  <p><span className="font-bold">Bills & Services:</span> Bills are complimentary and paid by the landlord (Electricity, Gas, Water, and Internet). Cleaning service for bathroom and kitchen is included. Maximum allowance is <span className="font-bold">$400.00/month</span> for all bills total; excess is shared between all tenants.</p>
                </div>
                <div className="flex gap-2">
                  <span className="font-bold">•</span>
                  <p><span className="font-bold">Cleaning:</span> Tenants must keep common areas (kitchen, bathroom, walkway) clean at all times. <span className="font-bold underline uppercase">Always take your shoes off</span> before entering the house.</p>
                </div>
                <div className="flex gap-2">
                  <span className="font-bold">•</span>
                  <p><span className="font-bold">Termination:</span> The agreement can be terminated if the tenant fails to follow rules. Eviction notice period is 14 days. Tenants must give 14 days written notice prior to moving out.</p>
                </div>
                <div className="flex gap-2">
                  <span className="font-bold">•</span>
                  <p><span className="font-bold">Restrictions:</span> No pets, no parties, no drugs, no illegal activities. No guests allowed to stay overnight without prior permission.</p>
                </div>
                <div className="flex gap-2">
                  <span className="font-bold">•</span>
                  <p><span className="font-bold">Condition:</span> Room must be returned in the same condition as the move-in date.</p>
                </div>
              </div>
            </div>

            {/* Signatures */}
            <div className="mt-12 space-y-12">
              <div className="grid grid-cols-2 gap-12">
                <div className="space-y-8">
                  <div className="border-t border-black pt-2">
                    <p className="text-xs uppercase font-bold">Signature of LANDLORD</p>
                    <p className="mt-1 text-sm">{formData.landlordName}</p>
                  </div>
                  <div>
                    <p className="text-[10pt] font-bold">Urgent Repairs Emergency Contact:</p>
                    <p className="text-lg">{formData.emergencyContact}</p>
                  </div>
                </div>
                <div className="space-y-8">
                  <div className="border-t border-black pt-2">
                    <p className="text-xs uppercase font-bold">Signature of TENANT</p>
                    <p className="mt-1 text-sm">{formData.tenant1Name || '________________________'}</p>
                  </div>
                  <div className="border-t border-black pt-2">
                    <p className="text-xs uppercase font-bold">Date of Signing</p>
                    <p className="mt-1 text-sm">____ / ____ / 202_</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* Sticky Bottom Actions - Hidden on Print */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-xl print:hidden">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <div className="hidden md:block">
            <p className="text-sm font-medium text-slate-600">Drafting for: <span className="text-blue-600">{formData.tenant1Name || 'New Tenant'}</span></p>
            <p className="text-xs text-slate-400">Victorian Residential Tenancy Standard Form 2025</p>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <button 
              onClick={handlePrint}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-slate-800 text-white px-8 py-3 rounded-lg hover:bg-slate-700 transition-colors font-semibold"
            >
              <Printer size={20} />
              Print Contract
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @media print {
          @page {
            margin: 15mm;
          }
          body {
            background-color: white;
          }
          .print-hidden {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default App;
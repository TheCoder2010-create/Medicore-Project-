import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  DollarSign, 
  Users, 
  FileText, 
  CreditCard, 
  Smartphone,
  Building2,
  Banknote,
  TrendingUp,
  Download,
  Filter,
  Search,
  AlertCircle,
  CheckCircle,
  Clock,
  Star,
  Shield
} from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

interface Provider {
  id: string;
  name: string;
  credentials: string;
  primarySpecialty: string;
  subspecialties: string[];
  department: string;
  status: 'Active' | 'LOA' | 'Inactive';
  statusDate: string;
  boardCertifications: Array<{
    certification: string;
    expirationDate: string;
  }>;
  patientPanelSize: number;
  maxCapacity: number;
  insuranceNetworks: Array<{
    network: string;
    status: 'Active' | 'Pending' | 'Inactive';
  }>;
  billingRates: {
    newPatient: number;
    followUp: number;
    consultation: number;
  };
  weeklyHours: number;
}

interface Medication {
  id: string;
  brandName: string;
  genericName: string;
  ndcCode: string;
  currentInventory: number;
  parLevel: number;
  formulations: string[];
  monthlyVolume: number;
  hcpcsCode: string;
  acquisitionCost: number;
  billingPrice: number;
  insuranceTier: string;
  priorAuthRequired: boolean;
  expirationDate: string;
  lotNumber: string;
}

interface Patient {
  id: string;
  name: string;
  visitDate: string;
  provider: string;
  services: Array<{
    cptCode: string;
    description: string;
    amount: number;
  }>;
  totalBill: number;
  paymentMethod: 'GPay' | 'Bank Transfer' | 'Cash' | 'Insurance' | 'Credit Card';
  paymentStatus: 'Paid' | 'Pending' | 'Partial';
}

const BillingReport: React.FC = () => {
  const [activeTab, setActiveTab] = useState('providers');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('2024-01');

  // Mock data for providers
  const providers: Provider[] = [
    {
      id: '1',
      name: 'Dr. Sarah Chen',
      credentials: 'MD, FACP',
      primarySpecialty: 'Internal Medicine',
      subspecialties: ['Cardiology', 'Endocrinology'],
      department: 'Internal Medicine Clinic',
      status: 'Active',
      statusDate: '2024-01-01',
      boardCertifications: [
        { certification: 'Internal Medicine', expirationDate: '2026-12-31' },
        { certification: 'Cardiovascular Disease', expirationDate: '2025-06-30' }
      ],
      patientPanelSize: 1250,
      maxCapacity: 1500,
      insuranceNetworks: [
        { network: 'Blue Cross Blue Shield', status: 'Active' },
        { network: 'Aetna', status: 'Active' },
        { network: 'Medicare', status: 'Active' }
      ],
      billingRates: {
        newPatient: 350,
        followUp: 200,
        consultation: 450
      },
      weeklyHours: 40
    },
    {
      id: '2',
      name: 'Dr. Michael Rodriguez',
      credentials: 'MD, FACEP',
      primarySpecialty: 'Emergency Medicine',
      subspecialties: ['Trauma Surgery', 'Critical Care'],
      department: 'Emergency Department',
      status: 'Active',
      statusDate: '2024-01-01',
      boardCertifications: [
        { certification: 'Emergency Medicine', expirationDate: '2025-12-31' },
        { certification: 'Critical Care Medicine', expirationDate: '2026-03-31' }
      ],
      patientPanelSize: 0,
      maxCapacity: 0,
      insuranceNetworks: [
        { network: 'All Major Networks', status: 'Active' }
      ],
      billingRates: {
        newPatient: 500,
        followUp: 300,
        consultation: 600
      },
      weeklyHours: 48
    },
    {
      id: '3',
      name: 'Emily Johnson',
      credentials: 'NP, MSN',
      primarySpecialty: 'Family Practice',
      subspecialties: ['Pediatrics', 'Women\'s Health'],
      department: 'Family Medicine Clinic',
      status: 'Active',
      statusDate: '2024-01-01',
      boardCertifications: [
        { certification: 'Family Nurse Practitioner', expirationDate: '2025-08-31' }
      ],
      patientPanelSize: 800,
      maxCapacity: 1000,
      insuranceNetworks: [
        { network: 'Blue Cross Blue Shield', status: 'Active' },
        { network: 'Medicaid', status: 'Active' }
      ],
      billingRates: {
        newPatient: 250,
        followUp: 150,
        consultation: 300
      },
      weeklyHours: 36
    }
  ];

  // Mock data for medications
  const medications: Medication[] = [
    {
      id: '1',
      brandName: 'Lipitor',
      genericName: 'Atorvastatin',
      ndcCode: '0071-0155-23',
      currentInventory: 500,
      parLevel: 200,
      formulations: ['10mg tablet', '20mg tablet', '40mg tablet'],
      monthlyVolume: 150,
      hcpcsCode: 'J3490',
      acquisitionCost: 2.50,
      billingPrice: 8.99,
      insuranceTier: 'Tier 2',
      priorAuthRequired: false,
      expirationDate: '2025-06-30',
      lotNumber: 'LT2024001'
    },
    {
      id: '2',
      brandName: 'Metformin',
      genericName: 'Metformin HCl',
      ndcCode: '0093-1074-01',
      currentInventory: 750,
      parLevel: 300,
      formulations: ['500mg tablet', '850mg tablet', '1000mg tablet'],
      monthlyVolume: 200,
      hcpcsCode: 'J3490',
      acquisitionCost: 0.75,
      billingPrice: 3.99,
      insuranceTier: 'Tier 1',
      priorAuthRequired: false,
      expirationDate: '2025-12-31',
      lotNumber: 'MT2024002'
    },
    {
      id: '3',
      brandName: 'Humira',
      genericName: 'Adalimumab',
      ndcCode: '0074-3799-02',
      currentInventory: 25,
      parLevel: 10,
      formulations: ['40mg/0.8mL prefilled pen'],
      monthlyVolume: 8,
      hcpcsCode: 'J0135',
      acquisitionCost: 5200.00,
      billingPrice: 6800.00,
      insuranceTier: 'Specialty',
      priorAuthRequired: true,
      expirationDate: '2024-09-30',
      lotNumber: 'HM2024003'
    }
  ];

  // Mock data for patient visits and billing
  const patientVisits: Patient[] = [
    {
      id: '1',
      name: 'John Smith',
      visitDate: '2024-01-15',
      provider: 'Dr. Sarah Chen',
      services: [
        { cptCode: '99213', description: 'Office Visit - Established Patient', amount: 200 },
        { cptCode: '80053', description: 'Comprehensive Metabolic Panel', amount: 85 }
      ],
      totalBill: 285,
      paymentMethod: 'GPay',
      paymentStatus: 'Paid'
    },
    {
      id: '2',
      name: 'Maria Garcia',
      visitDate: '2024-01-16',
      provider: 'Emily Johnson',
      services: [
        { cptCode: '99214', description: 'Office Visit - Detailed', amount: 250 },
        { cptCode: '90471', description: 'Immunization Administration', amount: 25 }
      ],
      totalBill: 275,
      paymentMethod: 'Bank Transfer',
      paymentStatus: 'Paid'
    },
    {
      id: '3',
      name: 'Robert Wilson',
      visitDate: '2024-01-17',
      provider: 'Dr. Michael Rodriguez',
      services: [
        { cptCode: '99285', description: 'Emergency Department Visit - High Complexity', amount: 600 },
        { cptCode: '71020', description: 'Chest X-ray', amount: 120 }
      ],
      totalBill: 720,
      paymentMethod: 'Insurance',
      paymentStatus: 'Pending'
    },
    {
      id: '4',
      name: 'Lisa Thompson',
      visitDate: '2024-01-18',
      provider: 'Dr. Sarah Chen',
      services: [
        { cptCode: '99203', description: 'New Patient Visit', amount: 350 },
        { cptCode: '93000', description: 'Electrocardiogram', amount: 75 }
      ],
      totalBill: 425,
      paymentMethod: 'Credit Card',
      paymentStatus: 'Paid'
    },
    {
      id: '5',
      name: 'David Brown',
      visitDate: '2024-01-19',
      provider: 'Emily Johnson',
      services: [
        { cptCode: '99213', description: 'Office Visit - Established Patient', amount: 150 },
        { cptCode: '85025', description: 'Complete Blood Count', amount: 45 }
      ],
      totalBill: 195,
      paymentMethod: 'Cash',
      paymentStatus: 'Paid'
    }
  ];

  // Calculate monthly totals
  const monthlyTotals = useMemo(() => {
    const totalRevenue = patientVisits.reduce((sum, visit) => sum + visit.totalBill, 0);
    const paidAmount = patientVisits
      .filter(visit => visit.paymentStatus === 'Paid')
      .reduce((sum, visit) => sum + visit.totalBill, 0);
    const pendingAmount = patientVisits
      .filter(visit => visit.paymentStatus === 'Pending')
      .reduce((sum, visit) => sum + visit.totalBill, 0);

    const paymentMethodBreakdown = patientVisits.reduce((acc, visit) => {
      if (visit.paymentStatus === 'Paid') {
        acc[visit.paymentMethod] = (acc[visit.paymentMethod] || 0) + visit.totalBill;
      }
      return acc;
    }, {} as Record<string, number>);

    const providerTotals = patientVisits.reduce((acc, visit) => {
      acc[visit.provider] = (acc[visit.provider] || 0) + visit.totalBill;
      return acc;
    }, {} as Record<string, number>);

    return {
      totalRevenue,
      paidAmount,
      pendingAmount,
      paymentMethodBreakdown,
      providerTotals,
      totalPatients: patientVisits.length
    };
  }, [patientVisits]);

  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case 'GPay': return <Smartphone className="w-4 h-4" />;
      case 'Bank Transfer': return <Building2 className="w-4 h-4" />;
      case 'Cash': return <Banknote className="w-4 h-4" />;
      case 'Credit Card': return <CreditCard className="w-4 h-4" />;
      case 'Insurance': return <Shield className="w-4 h-4" />;
      default: return <DollarSign className="w-4 h-4" />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Active': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'Pending': return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'Inactive': return <AlertCircle className="w-4 h-4 text-red-500" />;
      default: return <AlertCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">EMR Billing & Operations Report</h1>
          <p className="text-gray-600 mt-2">Comprehensive medical practice management dashboard</p>
          <div className="flex items-center mt-2 text-sm text-gray-500">
            <Calendar className="w-4 h-4 mr-1" />
            Report Period: {selectedMonth} | Last Updated: {new Date().toLocaleDateString()}
          </div>
        </div>
        <div className="flex items-center space-x-4 mt-4 lg:mt-0">
          <select 
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="2024-01">January 2024</option>
            <option value="2023-12">December 2023</option>
            <option value="2023-11">November 2023</option>
          </select>
          <Button>
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Monthly Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100">Total Revenue</p>
              <p className="text-3xl font-bold">${monthlyTotals.totalRevenue.toLocaleString()}</p>
            </div>
            <DollarSign className="w-8 h-8 text-blue-200" />
          </div>
          <p className="text-blue-100 text-sm mt-2">+12% from last month</p>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100">Collected Amount</p>
              <p className="text-3xl font-bold">${monthlyTotals.paidAmount.toLocaleString()}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-200" />
          </div>
          <p className="text-green-100 text-sm mt-2">
            {((monthlyTotals.paidAmount / monthlyTotals.totalRevenue) * 100).toFixed(1)}% collection rate
          </p>
        </Card>

        <Card className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-100">Pending Amount</p>
              <p className="text-3xl font-bold">${monthlyTotals.pendingAmount.toLocaleString()}</p>
            </div>
            <Clock className="w-8 h-8 text-yellow-200" />
          </div>
          <p className="text-yellow-100 text-sm mt-2">Awaiting insurance processing</p>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100">Total Patients</p>
              <p className="text-3xl font-bold">{monthlyTotals.totalPatients}</p>
            </div>
            <Users className="w-8 h-8 text-purple-200" />
          </div>
          <p className="text-purple-100 text-sm mt-2">This month</p>
        </Card>
      </div>

      {/* Payment Methods Breakdown */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Methods Breakdown</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {Object.entries(monthlyTotals.paymentMethodBreakdown).map(([method, amount]) => (
            <div key={method} className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-center mb-2">
                {getPaymentMethodIcon(method)}
              </div>
              <p className="text-sm font-medium text-gray-900">{method}</p>
              <p className="text-lg font-bold text-gray-900">${amount.toLocaleString()}</p>
              <p className="text-xs text-gray-500">
                {((amount / monthlyTotals.paidAmount) * 100).toFixed(1)}%
              </p>
            </div>
          ))}
        </div>
      </Card>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'providers', label: 'Medical Specialists Directory', icon: Users },
            { id: 'medications', label: 'Medication Inventory & Billing', icon: FileText },
            { id: 'appointments', label: 'Appointment Management', icon: Calendar },
            { id: 'billing', label: 'Patient Billing Details', icon: DollarSign }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="w-4 h-4 mr-2" />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === 'providers' && (
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Medical Specialists Directory</h3>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search providers..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Provider Details
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Specialties & Certifications
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Patient Panel
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Billing Rates
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {providers.map((provider) => (
                    <tr key={provider.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {provider.name}, {provider.credentials}
                          </div>
                          <div className="text-sm text-gray-500">{provider.department}</div>
                          <div className="text-xs text-gray-400">{provider.weeklyHours} hrs/week</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{provider.primarySpecialty}</div>
                        <div className="text-xs text-gray-500">
                          {provider.subspecialties.join(', ')}
                        </div>
                        <div className="mt-1">
                          {provider.boardCertifications.map((cert, index) => (
                            <span
                              key={index}
                              className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mr-1 mb-1"
                            >
                              {cert.certification} (exp: {cert.expirationDate})
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {provider.patientPanelSize} / {provider.maxCapacity}
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{
                              width: `${(provider.patientPanelSize / provider.maxCapacity) * 100}%`
                            }}
                          ></div>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {((provider.patientPanelSize / provider.maxCapacity) * 100).toFixed(1)}% capacity
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          New: ${provider.billingRates.newPatient}
                        </div>
                        <div className="text-sm text-gray-500">
                          Follow-up: ${provider.billingRates.followUp}
                        </div>
                        <div className="text-sm text-gray-500">
                          Consult: ${provider.billingRates.consultation}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {getStatusIcon(provider.status)}
                          <span className="ml-2 text-sm text-gray-900">{provider.status}</span>
                        </div>
                        <div className="text-xs text-gray-500">Since: {provider.statusDate}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {activeTab === 'medications' && (
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Medication Inventory & Billing</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Medication Details
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Inventory Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Billing Information
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Insurance & Auth
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {medications.map((medication) => (
                    <tr key={medication.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">
                          {medication.brandName} ({medication.genericName})
                        </div>
                        <div className="text-xs text-gray-500">NDC: {medication.ndcCode}</div>
                        <div className="text-xs text-gray-500">
                          Formulations: {medication.formulations.join(', ')}
                        </div>
                        <div className="text-xs text-gray-400">
                          Lot: {medication.lotNumber} | Exp: {medication.expirationDate}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          Current: {medication.currentInventory} units
                        </div>
                        <div className="text-sm text-gray-500">
                          Par Level: {medication.parLevel} units
                        </div>
                        <div className="text-sm text-gray-500">
                          Monthly Volume: {medication.monthlyVolume} units
                        </div>
                        <div className={`text-xs font-medium ${
                          medication.currentInventory < medication.parLevel 
                            ? 'text-red-600' 
                            : 'text-green-600'
                        }`}>
                          {medication.currentInventory < medication.parLevel ? 'Reorder Required' : 'In Stock'}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          HCPCS: {medication.hcpcsCode}
                        </div>
                        <div className="text-sm text-gray-500">
                          Cost: ${medication.acquisitionCost.toFixed(2)}
                        </div>
                        <div className="text-sm font-medium text-gray-900">
                          Bill: ${medication.billingPrice.toFixed(2)}
                        </div>
                        <div className="text-xs text-green-600">
                          Margin: ${(medication.billingPrice - medication.acquisitionCost).toFixed(2)}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-block px-2 py-1 text-xs font-medium rounded ${
                          medication.insuranceTier === 'Tier 1' ? 'bg-green-100 text-green-800' :
                          medication.insuranceTier === 'Tier 2' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {medication.insuranceTier}
                        </span>
                        <div className="mt-1">
                          {medication.priorAuthRequired && (
                            <span className="inline-block bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded">
                              Prior Auth Required
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {activeTab === 'appointments' && (
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Appointment Management</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-4">Provider Availability</h4>
                <div className="space-y-4">
                  {providers.map((provider) => (
                    <div key={provider.id} className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900">{provider.name}</span>
                        <span className="text-sm text-gray-500">{provider.weeklyHours}h/week</span>
                      </div>
                      <div className="text-sm text-gray-600">
                        Typical appointment duration: 30-45 minutes
                      </div>
                      <div className="text-sm text-gray-600">
                        Follow-up protocol: 2-4 weeks for chronic conditions
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-4">Scheduling Policies</h4>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h5 className="font-medium text-blue-900 mb-2">No-Show Policy</h5>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• First no-show: Warning notification</li>
                      <li>• Second no-show: $25 fee</li>
                      <li>• Third no-show: Discharge from practice</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h5 className="font-medium text-green-900 mb-2">Cancellation Policy</h5>
                    <ul className="text-sm text-green-800 space-y-1">
                      <li>• 24+ hours: No charge</li>
                      <li>• 12-24 hours: $15 fee</li>
                      <li>• Less than 12 hours: $25 fee</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <h5 className="font-medium text-purple-900 mb-2">Waitlist Management</h5>
                    <ul className="text-sm text-purple-800 space-y-1">
                      <li>• Automated notifications for openings</li>
                      <li>• Priority based on urgency level</li>
                      <li>• 2-hour response window required</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        )}

        {activeTab === 'billing' && (
          <div className="space-y-6">
            {/* Provider Revenue Summary */}
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Provider Revenue Summary</h3>
              <div className="grid md:grid-cols-3 gap-4">
                {Object.entries(monthlyTotals.providerTotals).map(([provider, total]) => (
                  <div key={provider} className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{provider}</p>
                        <p className="text-2xl font-bold text-gray-900">${total.toLocaleString()}</p>
                      </div>
                      <TrendingUp className="w-8 h-8 text-blue-500" />
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                      {((total / monthlyTotals.totalRevenue) * 100).toFixed(1)}% of total revenue
                    </p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Patient Billing Details */}
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Patient Billing Details</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Patient & Visit
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Services Provided
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Payment Details
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {patientVisits.map((visit) => (
                      <tr key={visit.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900">{visit.name}</div>
                          <div className="text-sm text-gray-500">Visit: {visit.visitDate}</div>
                          <div className="text-sm text-gray-500">Provider: {visit.provider}</div>
                        </td>
                        <td className="px-6 py-4">
                          {visit.services.map((service, index) => (
                            <div key={index} className="text-sm">
                              <span className="font-medium text-gray-900">{service.cptCode}</span>
                              <span className="text-gray-500"> - {service.description}</span>
                              <span className="text-gray-900"> (${service.amount})</span>
                            </div>
                          ))}
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-lg font-bold text-gray-900">
                            ${visit.totalBill.toLocaleString()}
                          </div>
                          <div className="flex items-center mt-1">
                            {getPaymentMethodIcon(visit.paymentMethod)}
                            <span className="ml-2 text-sm text-gray-600">{visit.paymentMethod}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            visit.paymentStatus === 'Paid' 
                              ? 'bg-green-100 text-green-800'
                              : visit.paymentStatus === 'Pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {getStatusIcon(visit.paymentStatus)}
                            <span className="ml-1">{visit.paymentStatus}</span>
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        )}
      </motion.div>

      {/* Footnotes and Compliance */}
      <Card className="bg-gray-50">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Important Notes & Compliance</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Recent Regulatory Updates</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• CMS 2024 Physician Fee Schedule updates effective January 1, 2024</li>
              <li>• New prior authorization requirements for high-cost medications</li>
              <li>• Updated HIPAA compliance requirements for telehealth services</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Quality Metrics & Standards</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• HEDIS quality measures compliance: 95.2%</li>
              <li>• Patient satisfaction scores: 4.8/5.0</li>
              <li>• Claims denial rate: 2.1% (industry avg: 5.8%)</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <div className="flex items-start">
            <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 mr-2" />
            <div>
              <h4 className="font-medium text-blue-900">Report Version Control</h4>
              <p className="text-sm text-blue-800 mt-1">
                Version 2024.01.3 | Generated: {new Date().toLocaleString()} | 
                Next scheduled update: {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default BillingReport;
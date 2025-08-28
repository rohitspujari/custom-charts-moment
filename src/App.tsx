import { MyTable } from './components/semaphor-components/my-table';
import { PaymentMethodCategories } from './components/semaphor-components/payment-method-categories';
import { PaymentTypes } from './components/semaphor-components/payment-types';

export default function App() {
  const tableData = [
    {
      'customer_name': 'Aaron Hawkins',
      'count': 4,
      'avg_sales': 77.85,
      'max_discount': 0,
      'sum_quantity': 17,
    },
    {
      'customer_name': 'Aaron Smayling',
      'count': 1,
      'avg_sales': 65.78,
      'max_discount': 0,
      'sum_quantity': 11,
    },
    {
      'customer_name': 'Adam Bellavance',
      'count': 5,
      'avg_sales': 887.73,
      'max_discount': 0,
      'sum_quantity': 12,
    },
  ];

  // Mock data for payment methods
  // Field order matters: [0] category/name, [1] amount, [2] percentage
  // Components now use sequential access, so field names can be anything
  const paymentMethodsData = [
    { category: 'Cash', amount: 433000, percentage: 53 },
    { category: 'Card', amount: 368000, percentage: 45 },
    { category: 'Bank', amount: 163000, percentage: 2 },
    { category: 'Mobile Money', amount: 0, percentage: 0 },
    { category: 'Wallet', amount: 0, percentage: 0 },
    { category: 'Voucher', amount: 0, percentage: 0 },
    { category: 'Other', amount: 0, percentage: 0 },
  ];

  // Mock data for payment types/merchants
  // Field order: [0] merchant name, [1] amount, [2] percentage
  const paymentTypesData = [
    { merchant: 'Shoprite Checkers', amount: 122000000, percentage: 15 },
    { merchant: 'PickNPay', amount: 98000000, percentage: 12 },
    { merchant: 'Flash', amount: 89000000, percentage: 11 },
    { merchant: 'Kazang', amount: 133000, percentage: 7 },
    { merchant: 'Spar', amount: 127000, percentage: 6 },
    { merchant: 'PEP', amount: 127000, percentage: 6 },
    { merchant: 'Shoprite Lesotho', amount: 127000, percentage: 6 },
    { merchant: 'Ackermans', amount: 127000, percentage: 6 },
    { merchant: 'Dunns', amount: 127000, percentage: 6 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-2xl font-bold mb-8 text-center">Payment Dashboard Components Demo</h1>
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Payment Method Categories Card - With Wrapper */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Payment Method Categories (with card wrapper)</h2>
          <PaymentMethodCategories 
            data={paymentMethodsData} 
            settings={{
              title: 'Payment method categories & types',
              subtitle: 'Transactions by payment methods category and types • Last 24 hours',
              showWrapper: true
            }}
          />
        </div>

        {/* Payment Types Card - With Wrapper */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Payment Types (with card wrapper)</h2>
          <PaymentTypes 
            data={paymentTypesData}
            settings={{
              showAmounts: true,
              showWrapper: true,
              title: 'Top Merchants',
              subtitle: 'Merchant transaction breakdown'
            }}
          />
        </div>
      </div>

      {/* Components without wrapper - as they would appear in Semaphor */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        <div>
          <h2 className="text-lg font-semibold mb-4">Payment Method Categories (content only - for Semaphor)</h2>
          <div className="border border-border rounded-lg p-6 bg-white">
            <PaymentMethodCategories 
              data={paymentMethodsData} 
              settings={{
                showWrapper: false
              }}
            />
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-4">Payment Types (content only - for Semaphor)</h2>
          <div className="border border-border rounded-lg p-6 bg-white">
            <PaymentTypes 
              data={paymentTypesData}
              settings={{
                showAmounts: true,
                showWrapper: false
              }}
            />
          </div>
        </div>
      </div>

      {/* Original MyTable Component */}
      <div className="max-w-3xl mx-auto mt-8">
        <h2 className="text-lg font-semibold mb-4">Original Table Component</h2>
        <div className="border border-border rounded-lg px-4 py-6">
          <MyTable data={tableData} />
        </div>
      </div>
    </div>
  );
}

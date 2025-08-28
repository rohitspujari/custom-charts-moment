import { SingleInputVisualProps } from '../config-types';
import { DashboardCardWrapper } from './dashboard-card-wrapper';
import { CircularProgress } from './circular-progress';

// Import SVG logos for payment methods
import CashIcon from '../../assets/Placeholders/Cash.svg';
import CardIcon from '../../assets/Placeholders/Card.svg';
import BankIcon from '../../assets/Placeholders/Bank.svg';
import MobileMoneyIcon from '../../assets/Placeholders/Mobile Money.svg';
import WalletIcon from '../../assets/Placeholders/Wallet.svg';
import VoucherIcon from '../../assets/Placeholders/Voucher.svg';
import OtherIcon from '../../assets/Placeholders/Other.svg';

interface PaymentMethodData {
  category?: string;
  name?: string;
  amount?: number | string | boolean;
  percentage?: number | string | boolean;
  icon?: string;
}

const iconMap: Record<string, string> = {
  'Cash': CashIcon,
  'Card': CardIcon,
  'Bank': BankIcon,
  'Mobile Money': MobileMoneyIcon,
  'Wallet': WalletIcon,
  'Voucher': VoucherIcon,
  'Other': OtherIcon,
};

const colorMap: Record<string, string> = {
  'Cash': '#10b981',
  'Card': '#8b5cf6',
  'Bank': '#3b82f6',
  'Mobile Money': '#f59e0b',
  'Wallet': '#eab308',
  'Voucher': '#ef4444',
  'Other': '#6b7280',
};

function formatCurrency(amount: number | string | boolean): string {
  if (typeof amount === 'boolean') return 'ZAR 0';
  const value = typeof amount === 'string' ? parseFloat(amount) : amount;
  if (isNaN(value)) return 'ZAR 0';

  if (value >= 1000000) {
    return `ZAR ${Math.round(value / 100000) / 10}M`;
  } else if (value >= 1000) {
    return `ZAR ${Math.round(value / 1000)}K`;
  } else {
    return `ZAR ${Math.round(value)}`;
  }
}

export function PaymentMethodCategories({
  data,
  settings,
}: SingleInputVisualProps) {
  if (!data || data.length === 0) return null;

  const title = typeof settings?.['title'] === 'string' 
    ? settings['title'] 
    : 'Payment method categories & types';
  const subtitle = typeof settings?.['subtitle'] === 'string'
    ? settings['subtitle']
    : 'Transactions by payment methods category and types • Last 24 hours';
  const showWrapper =
    settings?.['showWrapper'] === true || settings?.['showWrapper'] === 'true';

  // Access fields by position: [0] = name, [1] = amount, [2] = percentage
  const categoryData: PaymentMethodData[] = data
    .filter((row) => {
      const values = Object.values(row ?? {});
      return values?.[0]; // Has a name/category value
    })
    .map((row) => {
      const values = Object.values(row ?? {});
      return {
        category: (values?.[0] as string) ?? '', // First field is category/name
        amount: values?.[1] ?? 0, // Second field is amount
        percentage: values?.[2] ?? 0, // Third field is percentage
      };
    });

  const categories = [
    'Cash',
    'Card',
    'Bank',
    'Mobile Money',
    'Wallet',
    'Voucher',
    'Other',
  ];

  const processedData = categories.map((cat) => {
    const item = categoryData.find(
      (d) => d.category?.toLowerCase() === cat.toLowerCase()
    );
    return {
      name: cat,
      amount: item?.amount || 0,
      percentage: item?.percentage || 0,
    };
  });

  const content = (
    <div className="space-y-4 p-2">
      {processedData.map((method) => {
        const percentage =
          typeof method.percentage === 'string'
            ? parseFloat(method.percentage)
            : typeof method.percentage === 'number'
            ? method.percentage
            : 0;
        const isActive = percentage > 0;

        return (
          <div key={method.name} className="flex items-center justify-between">
            <div className="flex items-center gap-3 flex-1">
              <img
                src={iconMap[method.name] || iconMap['Other']}
                alt={method.name}
                className={`w-10 h-10 object-contain ${
                  !isActive ? 'opacity-40' : ''
                }`}
              />
              <div className="min-w-0 flex-1">
                <p
                  className={`text-sm ${
                    isActive ? 'text-gray-700' : 'text-gray-500'
                  }`}
                >
                  {method.name}
                </p>
                <p
                  className={`text-lg font-semibold ${
                    isActive ? 'text-gray-900' : 'text-gray-400'
                  }`}
                >
                  {formatCurrency(method.amount)}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <CircularProgress
                percentage={percentage}
                size={44}
                strokeWidth={4}
                color={
                  isActive ? colorMap[method.name] || '#6b7280' : '#e5e7eb'
                }
                backgroundColor="#e5e7eb"
                showLabel={isActive}
              />
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <DashboardCardWrapper
      title={title}
      subtitle={subtitle}
      showWrapper={showWrapper}
    >
      {content}
    </DashboardCardWrapper>
  );
}

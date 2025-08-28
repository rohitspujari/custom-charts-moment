import { SingleInputVisualProps } from '../config-types';
import { DashboardCardWrapper } from './dashboard-card-wrapper';
import { Progress } from '../ui/progress';

// Import merchant logos
import FlashLogo from '../../assets/Partners/Flash.svg';
import KazangLogo from '../../assets/Partners/Kazang.svg';
import PEPLogo from '../../assets/Partners/PEP.svg';
import MTNLogo from '../../assets/Partners/MTN.svg';
import VodacomLogo from '../../assets/Partners/Vodacom.svg';
import CapitecLogo from '../../assets/Partners/Capitec.svg';
import SnapScanLogo from '../../assets/Partners/SnapScan.svg';
import ZapperLogo from '../../assets/Partners/Zapper.svg';
import MasterpassLogo from '../../assets/Partners/Masterpass.svg';
import VoucherLogo from '../../assets/Partners/1Voucher.svg';
import PayShapLogo from '../../assets/Partners/PayShap.svg';

interface MerchantData {
  merchant?: string;
  name?: string;
  percentage?: number | string | boolean;
  amount?: number | string | boolean;
  logo?: string;
  color?: string;
  logoSrc?: string;
}

const merchantLogos: Record<string, string> = {
  'Flash': FlashLogo,
  'Kazang': KazangLogo,
  'PEP': PEPLogo,
  'MTN': MTNLogo,
  'MTN Mobile Money': MTNLogo,
  'Vodacom': VodacomLogo,
  'Vodacom M-Pesa': VodacomLogo,
  'Capitec': CapitecLogo,
  'SnapScan': SnapScanLogo,
  'Zapper': ZapperLogo,
  'Masterpass': MasterpassLogo,
  '1Voucher': VoucherLogo,
  'PayShap': PayShapLogo
};

const merchantColors: Record<string, string> = {
  'Shoprite Checkers': 'bg-red-600',
  'Shoprite': 'bg-red-600',
  'Checkers': 'bg-red-600',
  'PickNPay': 'bg-pink-600',
  'Pick n Pay': 'bg-pink-600',
  'PnP': 'bg-pink-600',
  'Flash': 'bg-green-700',
  'Kazang': 'bg-yellow-600',
  'Spar': 'bg-green-600',
  'PEP': 'bg-blue-600',
  'Shoprite Lesotho': 'bg-red-600',
  'Ackermans': 'bg-gray-600',
  'Dunns': 'bg-gray-600',
  'MTN Mobile Money': 'bg-yellow-500',
  'MTN': 'bg-yellow-500',
  'Vodacom M-Pesa': 'bg-red-500',
  'Vodacom': 'bg-red-500',
  'Capitec': 'bg-blue-800',
  'SnapScan': 'bg-blue-500',
  'Zapper': 'bg-green-500',
  'Masterpass': 'bg-orange-500',
  '1Voucher': 'bg-purple-500',
  'PayShap': 'bg-teal-500'
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

function getInitials(name: string): string {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

function getMerchantLogo(name: string): string | null {
  // Check for exact match first
  if (merchantLogos[name]) {
    return merchantLogos[name];
  }
  
  // Check for partial match
  for (const [key, logo] of Object.entries(merchantLogos)) {
    if (name.toLowerCase().includes(key.toLowerCase()) || 
        key.toLowerCase().includes(name.toLowerCase())) {
      return logo;
    }
  }
  return null;
}

function getMerchantColor(name: string): string {
  for (const [key, color] of Object.entries(merchantColors)) {
    if (name.toLowerCase().includes(key.toLowerCase())) {
      return color;
    }
  }
  return 'bg-gray-600';
}

export function PaymentTypes({ data, settings }: SingleInputVisualProps) {
  if (!data || data.length === 0) return null;

  const showAmounts = settings?.['showAmounts'] !== false;
  const showWrapper = settings?.['showWrapper'] === true || settings?.['showWrapper'] === 'true';
  const title = typeof settings?.['title'] === 'string' ? settings['title'] : '';
  const subtitle = typeof settings?.['subtitle'] === 'string' ? settings['subtitle'] : '';

  // Access fields by position: [0] = merchant name, [1] = amount, [2] = percentage
  const merchantData: MerchantData[] = data
    .filter(row => {
      const values = Object.values(row ?? {});
      return values?.[0]; // Has a merchant name value
    })
    .map(row => {
      const values = Object.values(row ?? {});
      return {
        merchant: (values?.[0] as string) ?? '', // First field is merchant name
        amount: values?.[1] ?? 0, // Second field is amount  
        percentage: values?.[2] ?? 0, // Third field is percentage
        logo: (values?.[3] as string) ?? undefined, // Optional fourth field for logo
        color: (values?.[4] as string) ?? undefined // Optional fifth field for color
      };
    })
    .sort((a, b) => {
      const percentA = typeof a.percentage === 'string' ? parseFloat(a.percentage) : (typeof a.percentage === 'number' ? a.percentage : 0);
      const percentB = typeof b.percentage === 'string' ? parseFloat(b.percentage) : (typeof b.percentage === 'number' ? b.percentage : 0);
      return percentB - percentA;
    });

  const content = (
    <div className="space-y-4 p-2">
        {merchantData.map((merchant, index) => {
          const percentage = typeof merchant.percentage === 'string' 
            ? parseFloat(merchant.percentage) 
            : (typeof merchant.percentage === 'number' ? merchant.percentage : 0);
          
          const merchantLogo = getMerchantLogo(merchant.merchant || '');
          
          return (
            <div 
              key={`${merchant.merchant}-${index}`} 
              className="space-y-2 p-2 -mx-2 rounded-lg transition-all duration-200 hover:bg-gray-50 cursor-pointer active:bg-gray-100"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  {merchantLogo ? (
                    <img 
                      src={merchantLogo} 
                      alt={merchant.merchant}
                      className="w-10 h-10 object-contain"
                    />
                  ) : (
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${merchant.color || getMerchantColor(merchant.merchant || '')} text-white text-xs font-semibold`}>
                      {merchant.logo || getInitials(merchant.merchant || '')}
                    </div>
                  )}
                  <div className="flex items-center gap-2 min-w-0 flex-1">
                    <span className="font-medium text-gray-900 truncate">
                      {merchant.merchant}
                    </span>
                    <span className="text-sm text-gray-600 flex-shrink-0">
                      • {percentage}%
                    </span>
                  </div>
                </div>
                {showAmounts && (
                  <span className="text-sm font-semibold text-gray-900 flex-shrink-0 ml-2">
                    {formatCurrency(merchant.amount || 0)}
                  </span>
                )}
              </div>
              <div className="ml-11">
                <Progress 
                  value={Math.min(percentage * 6.67, 100)} 
                  className="h-2 bg-gray-200"
                  style={{
                    '--progress-background': '#10b981'
                  } as React.CSSProperties}
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
      className="h-full"
    >
      {content}
    </DashboardCardWrapper>
  );
}
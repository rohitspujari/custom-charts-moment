# Payment Dashboard Components - Field Sequence Documentation

## Overview
Both components access data fields by position/sequence rather than by field names. This allows the backend to use any field names without breaking the frontend components.

## PaymentMethodCategories Component

### Required Field Sequence:
1. **Field [0]**: Category/Name (string)
   - Expected values: 'Cash', 'Card', 'Bank', 'Mobile Money', 'Wallet', 'Voucher', 'Other'
   - This field identifies the payment method category

2. **Field [1]**: Amount (number/string)
   - The monetary amount for this category
   - Will be formatted as currency (ZAR)

3. **Field [2]**: Percentage (number/string)
   - The percentage value for this category
   - Used for the circular progress indicator

### Example Data Structure:
```javascript
[
  { field1: 'Cash', field2: 433000, field3: 53 },
  { field1: 'Card', field2: 368000, field3: 45 },
  { field1: 'Bank', field2: 163000, field3: 2 }
]
```

Note: Field names (`field1`, `field2`, `field3`) can be anything - the component only cares about the sequence.

## PaymentTypes Component

### Required Field Sequence:
1. **Field [0]**: Merchant/Company Name (string)
   - The name of the merchant or company
   - Used for display and logo matching

2. **Field [1]**: Amount (number/string)
   - The monetary amount for this merchant
   - Will be formatted as currency (ZAR)

3. **Field [2]**: Percentage (number/string)
   - The percentage value for this merchant
   - Used for the progress bar and percentage display

4. **Field [3]**: Custom Logo Text (string) - Optional
   - If provided, overrides the auto-generated initials
   - Displayed in the circular badge when no logo image is found

5. **Field [4]**: Custom Color (string) - Optional
   - CSS color class for the circular badge
   - Example: 'bg-blue-600'
   - Only used when no logo image is found

### Example Data Structure:
```javascript
[
  { name: 'Shoprite Checkers', total: 122000000, percent: 15 },
  { name: 'PickNPay', total: 98000000, percent: 12 },
  { name: 'Flash', total: 89000000, percent: 11 }
]
```

Again, field names can be anything - components access by position.

## Settings Properties

Both components accept these settings:

### PaymentMethodCategories Settings:
- `title` (string): Card title text
- `subtitle` (string): Card subtitle text  
- `showWrapper` (boolean/'true'): Whether to show the card wrapper

### PaymentTypes Settings:
- `title` (string): Card title text
- `subtitle` (string): Card subtitle text
- `showWrapper` (boolean/'true'): Whether to show the card wrapper
- `showAmounts` (boolean): Whether to display amount values (default: true)

## Important Notes

1. **Field Access Pattern**: Components use `Object.values(row)` to access fields sequentially
2. **Null Safety**: All field access uses null coalescing (`??`) to handle missing data
3. **Type Flexibility**: Fields can be numbers, strings, or booleans - components handle conversion
4. **Order Matters**: Fields MUST be provided in the exact sequence specified above
5. **Backend Flexibility**: Backend can name fields anything - only the sequence matters
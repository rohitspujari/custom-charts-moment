import { ComponentsConfig } from './config-types';

export const config: ComponentsConfig = {
  visuals: [
    {
      name: 'My New Table', // Name of the component,
      component: 'MyTable',
      componentType: 'chart',
      chartType: 'table',
      settings: {
        label: {
          title: 'Label', // Label for the component
          defaultValue: 'my label', // Default value for the label
          ui: 'input', // UI for the label
        },
      },
    },
    {
      name: 'Payment Method Categories',
      component: 'PaymentMethodCategories',
      componentType: 'chart',
      chartType: 'table',
      settings: {
        title: {
          title: 'Title',
          defaultValue: 'Payment method categories & types',
          ui: 'input',
        },
        subtitle: {
          title: 'Subtitle',
          defaultValue: 'Transactions by payment methods category and types • Last 24 hours',
          ui: 'input',
        },
        showWrapper: {
          title: 'Show Card Wrapper',
          defaultValue: 'false',
          ui: 'select',
          options: [
            { label: 'Yes', value: 'true' },
            { label: 'No', value: 'false' },
          ],
        },
      },
    },
    {
      name: 'Payment Types',
      component: 'PaymentTypes',
      componentType: 'chart',
      chartType: 'table',
      settings: {
        title: {
          title: 'Title',
          defaultValue: '',
          ui: 'input',
        },
        subtitle: {
          title: 'Subtitle',
          defaultValue: '',
          ui: 'input',
        },
        showAmounts: {
          title: 'Show Amounts',
          defaultValue: 'true',
          ui: 'select',
          options: [
            { label: 'Yes', value: 'true' },
            { label: 'No', value: 'false' },
          ],
        },
        showWrapper: {
          title: 'Show Card Wrapper',
          defaultValue: 'false',
          ui: 'select',
          options: [
            { label: 'Yes', value: 'true' },
            { label: 'No', value: 'false' },
          ],
        },
      },
    },
  ],
};

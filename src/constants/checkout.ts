import type { PaymentMethod, ShippingMethod } from '@/types/checkout'

export interface ShippingOption {
  id: ShippingMethod
  name: string
  description: string
  price: number
}

export interface PaymentOption {
  id: PaymentMethod
  name: string
  description: string
}

export const SHIPPING_OPTIONS: ShippingOption[] = [
  {
    id: 'standard',
    name: 'Envío estándar',
    description: 'Entrega estimada de 4 a 7 días laborables.',
    price: 0,
  },
  {
    id: 'express',
    name: 'Envío rápido',
    description: 'Entrega estimada de 1 a 3 días laborables.',
    price: 9.99,
  },
]

export const PAYMENT_OPTIONS: PaymentOption[] = [
  {
    id: 'card',
    name: 'Tarjeta',
    description: 'Pago simulado con tarjeta de crédito o débito.',
  },
  {
    id: 'cash',
    name: 'Pago contra entrega',
    description: 'Paga cuando recibas tu pedido.',
  },
]

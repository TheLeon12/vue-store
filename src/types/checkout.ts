export type ShippingMethod = 'standard' | 'express'

export type PaymentMethod = 'card' | 'cash'

export interface CheckoutForm {
  firstName: string
  lastName: string
  email: string
  phone: string

  address: string
  city: string
  province: string
  postalCode: string
  country: string

  shippingMethod: ShippingMethod
  paymentMethod: PaymentMethod

  cardholderName: string
  cardNumber: string
  cardExpiry: string
  cardCvc: string

  notes: string
  acceptTerms: boolean
}

export type CheckoutField = keyof CheckoutForm

export type CheckoutErrors = Partial<Record<CheckoutField, string>>

export interface CheckoutOrderItem {
  productId: number
  title: string
  quantity: number
  unitPrice: number
  subtotal: number
}

export interface CheckoutOrder {
  id: string
  createdAt: string
  customerName: string
  email: string
  shippingAddress: string
  shippingMethod: ShippingMethod
  paymentMethod: PaymentMethod
  items: CheckoutOrderItem[]
  subtotal: number
  discount: number
  shippingCost: number
  total: number
}

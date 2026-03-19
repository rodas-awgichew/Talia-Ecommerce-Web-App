export default function SuccessPage() {
  return (
    <div className="max-w-4xl mx-auto py-32 text-center">

      <h1 className="text-5xl font-serif mb-6">
        Payment Successful
      </h1>

      <p className="text-charcoal/60 mb-10">
        Thank you for your order.
      </p>

      <a
        href="/shop"
        className="px-8 py-4 bg-charcoal text-bone uppercase text-xs tracking-widest"
      >
        Continue Shopping
      </a>

    </div>
  );
}
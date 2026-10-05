import React from 'react';
import ResilientImage from './ResilientImage.jsx';

export default function ProductSpectrumSection({
  products,
  openProductLandingPage,
}) {
  return (
    <section
      id="products"
      className="max-w-[1200px] mx-auto px-6 py-16 md:py-24"
    >
      <div className="text-center max-w-2xl mx-auto mb-14">
        <p className="text-[11px] font-bold tracking-[0.08em] uppercase text-[#0066FF] mb-2.5">
          PRODUCT SPECTRUM
        </p>
        <h2
          className="text-[28px] sm:text-[36px] font-extrabold text-[#0F172A] tracking-[-0.02em] leading-[1.18]"
          style={{ textWrap: 'balance' }}
        >
          Technology Built to Make Possibilities Real
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
        {products.map((product) => (
          <div
            key={product.id}
            onClick={() => openProductLandingPage(product)}
            className="group bg-white rounded-[18px] border border-slate-100 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_14px_38px_rgb(0,102,255,0.08)] hover:border-blue-100 transition-all duration-200 flex flex-col cursor-pointer"
          >
            <div className="w-full aspect-[16/10] rounded-[12px] overflow-hidden mb-6 bg-slate-900">
              <ResilientImage
                src={product.image}
                alt={product.title}
                fallbackTitle={product.title}
                className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
              />
            </div>

            <h3 className="text-[18px] font-bold text-[#0F172A] mb-2.5 tracking-tight">
              {product.title}
            </h3>

            <p className="text-[13.5px] text-slate-500 leading-[1.6] mb-6 flex-1">
              {product.description}
            </p>

            <div className="pt-1">
              <span className="text-[16px] font-extrabold text-[#0066FF] tabular-nums tracking-tight">
                {product.price}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

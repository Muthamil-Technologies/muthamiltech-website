import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { Product } from "../../lib/listings";
import { facts, fetchListings, headline, isFeatured, kicker, type PublicListing } from "../../lib/publicListings";
import { Heading } from "./SectionParts";
import { SHOW_PARTNERS } from "../../lib/joSections";

// Partner listings on section pages. Paid placements are labelled 広告 (Japan's stealth-marketing
// rules); nothing renders until there is at least one published listing.

const NOTE: Record<Product, string> = {
  job: "From employers we have checked. You apply with the employer directly; JapanOne doesn't take part in hiring and never charges you.",
  tour: "From agencies and guides we have checked. You book with them directly; JapanOne doesn't take bookings or payments.",
  course: "From schools we have checked. You apply to the school directly; JapanOne doesn't take applications or fees.",
  item: "From shops we have checked. You buy from the shop directly; JapanOne doesn't take orders or payments.",
};

export function AdLabel({ dark = false }: { dark?: boolean }) {
  return <span className={`t-small self-start rounded-full px-2.5 py-0.5 font-extrabold ${dark ? "bg-jo-yellow text-jo-navy" : "bg-jo-yellow text-jo-navy"}`}>広告 · Featured</span>;
}

export function ListingCard({ l, color }: { l: PublicListing; color: string }) {
  const big = headline(l);
  const line = facts(l);
  if (isFeatured(l)) {
    return (
      <Link to={`/listings/${l.id}`} className="lift flex flex-col gap-2 rounded-[28px] bg-jo-navy p-7 text-white no-underline sm:p-9 md:col-span-full">
        <AdLabel dark />
        <span className="t-small font-bold text-[#b9c6d6]">{kicker(l)}</span>
        <span className="text-[26px] font-black leading-tight sm:text-[30px]">{l.title}</span>
        <span className="text-[#d9e1ec]">{l.provider?.name} · Verified partner</span>
        {big && <span className="text-[24px] font-black text-jo-yellow">{big}</span>}
        {line.length > 0 && <span className="text-[#d9e1ec]">{line.join(" · ")}</span>}
      </Link>
    );
  }
  return (
    <Link to={`/listings/${l.id}`} className="lift flex flex-col gap-1.5 rounded-[24px] bg-white p-6 text-jo-navy no-underline">
      <span className="t-small font-bold" style={{ color }}>{kicker(l)}</span>
      <span className="t-title">{l.title}</span>
      <span className="t-small text-jo-muted">{l.provider?.name} · Verified</span>
      {big && <span className="text-[22px] font-black">{big}</span>}
      {line.length > 0 && <span className="t-small text-jo-muted">{line.join(" · ")}</span>}
    </Link>
  );
}

/** A section of listings: hidden while there are none. `areas` keeps only listings in those places. */
type ListingSectionProps = { product: Product; title: string; color: string; areas?: string[]; limit?: number };

export function ListingSection(props: ListingSectionProps) {
  return SHOW_PARTNERS ? <Listed {...props} /> : null;
}

function Listed({ product, title, color, areas, limit = 7 }: ListingSectionProps) {
  const [items, setItems] = useState<PublicListing[] | null>(null);
  const key = areas?.join("|") ?? "";
  useEffect(() => {
    let live = true;
    fetchListings(product, { limit, areas: key ? key.split("|") : undefined }).then((r) => live && setItems(r));
    return () => { live = false; };
  }, [product, limit, key]);
  if (!items?.length) return null;
  return (
    <section className="pt-20">
      <Heading title={title} />
      <p className="m-0 -mt-3 mb-6 max-w-[70ch]">{NOTE[product]}</p>
      <div className="grid gap-4 md:grid-cols-3" data-reveal>
        {items.map((l) => <ListingCard key={l.id} l={l} color={color} />)}
      </div>
      <p className="t-small m-0 mt-4 text-jo-muted">
        Listings marked 広告 are paid placements. {product === "job" ? "Pay is before tax. " : ""}Check every detail with the {product === "job" ? "employer" : product === "course" ? "school" : product === "tour" ? "agency" : "shop"} before you decide.
      </p>
    </section>
  );
}

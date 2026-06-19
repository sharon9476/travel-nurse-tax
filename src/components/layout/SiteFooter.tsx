export default function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-navy border-t border-white/10 py-8 mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-2">
        <p className="text-sm text-muted-foreground">
          &copy; {year} TravelNurseTax.app — Free tax tools for travel nurses.
        </p>
        <p className="text-xs text-muted-foreground max-w-2xl mx-auto">
          All calculations are estimates for informational purposes only and do not constitute tax advice.
          Consult a qualified tax professional before making financial decisions.
        </p>
      </div>
    </footer>
  )
}

import { LucideIcon } from "lucide-react";
import { ContactMessageCard } from "../../components/ContactMessageCard";

interface RealEstateServicePageProps {
  icon: LucideIcon;
  title: string;
  content: string;
  contactMessage: string;
}

export function RealEstateServicePage({
  icon: Icon,
  title,
  content,
  contactMessage,
}: RealEstateServicePageProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r bg-base-blue to-blue-800 text-white py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <Icon className="w-10 h-10" />
            <h1 className="text-4xl font-bold">{title}</h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="prose prose-lg max-w-none">
          <div className="text-gray-700 whitespace-pre-line leading-relaxed">
            {content}
          </div>
        </div>

        {/* Contact CTA */}
        <ContactMessageCard contactMessage={contactMessage} />

        {/* Related Services */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Other Real Estate Services</h3>
          <a 
            href="/real-estate" 
            className="inline-block text-base-blue hover:text-blue-700 font-semibold"
          >
            ← Back to Real Estate Services
          </a>
        </div>
      </div>
    </div>
  );
}

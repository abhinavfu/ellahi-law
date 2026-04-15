interface ContactCardProps {
  contactMessage: string;
}

export function ContactMessageCard({ contactMessage }: ContactCardProps) {
  return (
    <div className="mt-16 bg-blue-50 border-l-4 border-base-blue p-8 rounded">
           <p className="text-xl font-semibold text-gray-900">{contactMessage}</p>
           <div className="mt-6">
             <a
               href="/contact"
               className="inline-block bg-base-blue hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded transition-colors"
             >
              Contact us today
            </a>
          </div>
        </div>
  );
}

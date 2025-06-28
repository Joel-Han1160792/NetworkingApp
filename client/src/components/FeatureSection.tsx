export default function FeatureSection() {
  return (
    <section className="w-full flex py-20 bg-gray-100">
      <div className="flex-1 flex flex-col items-center p-0">
        <h3 className="text-2xl font-bold mb-2">Feature 1</h3>
        <p className="text-gray-700">Description of feature one.</p>
      </div>
      <div className="flex-1 flex flex-col items-center p-0">
        <h3 className="text-2xl font-bold mb-2">Feature 2</h3>
        <p className="text-gray-700">Description of feature two.</p>
      </div>
      <div className="flex-1 flex flex-col items-center p-0">
        <h3 className="text-2xl font-bold mb-2">Feature 3</h3>
        <p className="text-gray-700">Description of feature three.</p>
      </div>
    </section>
  );
}

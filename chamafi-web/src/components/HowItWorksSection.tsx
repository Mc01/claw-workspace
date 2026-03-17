export default function HowItWorksSection() {
  return (
    <div className="py-12 bg-white" id="how-it-works">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-emerald-600 font-semibold tracking-wide uppercase">How It Works</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Simple steps to financial empowerment
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            ChamaFi makes it easy for savings groups to manage funds, make decisions, and grow together.
          </p>
        </div>

        <div className="mt-10">
          <div className="relative">
            {/* Horizontal line */}
            <div className="hidden md:block absolute top-16 left-1/4 right-1/4 h-0.5 bg-amber-300"></div>
            
            <div className="relative grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="flex items-center justify-center">
                  <div className="flex-shrink-0 flex items-center justify-center h-16 w-16 rounded-full bg-emerald-100 text-emerald-600 text-2xl font-bold">
                    1
                  </div>
                </div>
                <div className="mt-5">
                  <h3 className="text-lg font-medium text-gray-900">Create Group</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Set up your savings group with member details and contribution rules on the Celo blockchain.
                  </p>
                </div>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center">
                  <div className="flex-shrink-0 flex items-center justify-center h-16 w-16 rounded-full bg-amber-100 text-amber-600 text-2xl font-bold">
                    2
                  </div>
                </div>
                <div className="mt-5">
                  <h3 className="text-lg font-medium text-gray-900">Contribute</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Members make regular contributions directly to the group's smart contract wallet.
                  </p>
                </div>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center">
                  <div className="flex-shrink-0 flex items-center justify-center h-16 w-16 rounded-full bg-emerald-100 text-emerald-600 text-2xl font-bold">
                    3
                  </div>
                </div>
                <div className="mt-5">
                  <h3 className="text-lg font-medium text-gray-900">Invest & Grow</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Vote on investment opportunities in DeFi protocols to generate returns for the group.
                  </p>
                </div>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center">
                  <div className="flex-shrink-0 flex items-center justify-center h-16 w-16 rounded-full bg-amber-100 text-amber-600 text-2xl font-bold">
                    4
                  </div>
                </div>
                <div className="mt-5">
                  <h3 className="text-lg font-medium text-gray-900">Distribute Returns</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Profits are automatically distributed to members based on their contributions and voting power.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
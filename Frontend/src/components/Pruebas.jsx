export default function Pruebas() {
    return (
        <>
            <div class="text-center">
  <button type="button" class="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" data-hs-overlay="#hs-modal-upgrade-to-pro">
    Open modal
  </button>
</div>

<div id="hs-modal-upgrade-to-pro" class="hs-overlay hidden w-full h-full fixed top-0 start-0 z-[60] overflow-x-hidden overflow-y-auto">
  <div class="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto">
    <div class="bg-white border border-gray-200 rounded-xl shadow-sm pointer-events-auto dark:bg-gray-800 dark:border-gray-700">
      <div class="p-4 sm:p-7">
        <div class="text-center">
          <h2 class="block text-xl sm:text-2xl font-semibold text-gray-800 dark:text-gray-200">Advanced features</h2>
          <div class="max-w-sm mx-auto">
            <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
              "Compare to" Price, Bulk Discount Pricing, Inventory Tracking
              <a class="text-blue-600 decoration-2 hover:underline font-medium" href="../examples/html/modal-signup.html">
                Sign up here
              </a>
            </p>
          </div>
          <div class="mt-5">
            <a class="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" href="#">
              <svg class="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
              </svg>
              Upgrade to get these features
            </a>
          </div>
        </div>

        <div class="mt-8 sm:mt-10 divide-y divide-gray-200 dark:divide-gray-700">
          <div class="flex gap-x-7 py-5 first:pt-0 last:pb-0">
            <svg class="flex-shrink-0 mt-1 w-7 h-7 text-gray-600 dark:text-gray-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><path d="M12 18V6"/></svg>

            <div>
              <h3 class="font-semibold text-gray-800 dark:text-gray-200">
                "Compare to" price
              </h3>
              <p class="text-sm text-gray-500">
                Use this feature when you want to put a product on sale or show savings off suggested retail pricing.
              </p>
            </div>
          </div>
          

          <div class="flex gap-x-7 py-5 first:pt-0 last:pb-0">
            <svg class="flex-shrink-0 mt-1 w-7 h-7 text-gray-600 dark:text-gray-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="6" r="3"/><path d="M8.12 8.12 12 12"/><path d="M20 4 8.12 15.88"/><circle cx="6" cy="18" r="3"/><path d="M14.8 14.8 20 20"/></svg>

            <div>
              <h3 class="font-semibold text-gray-800 dark:text-gray-200">
                Bulk discount pricing
              </h3>
              <p class="text-sm text-gray-500">
                Encourage higher purchase quantities with volume discounts.
              </p>
            </div>
          </div>
          <div class="flex gap-x-7 py-5 first:pt-0 last:pb-0">
            <svg class="flex-shrink-0 mt-1 w-7 h-7 text-gray-600 dark:text-gray-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>

            <div>
              <h3 class="font-semibold text-gray-800 dark:text-gray-200">
                Inventory tracking
              </h3>
              <p class="text-sm text-gray-500">
                Automatically keep track of product availability and receive notifications when inventory levels get low.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="flex justify-end items-center gap-x-2 p-4 sm:px-7 border-t dark:border-gray-700">
        <button type="button" class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" data-hs-overlay="#hs-notifications">
          Cancel
        </button>
        <a class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" href="#">
        </a>
      </div>
    </div>
  </div>
</div>
        </>
    )

}
// export default function Hero({ variant }) {
//   return (
//     <section
//       className="
//         relative h-[25vh]
//         bg-[url('/libarayjpg.png')] bg-cover bg-center
//       "
//     >

//       <div className="absolute inset-0 bg-black/60"></div>

//       {variant === "home" && (
//         <div className="absolute inset-0 flex justify-center items-center px-4 z-10">
//           <input
//             type="text"
//             placeholder="Search book..."
//             className="w-full max-w-xl p-3 rounded-lg"
//           />
//         </div>
//       )}
//     </section>
//   );
// }
export default function Hero({ variant }) {
  return (
    <section>
      {variant === "home" && (
        <div className="absolute inset-1 flex justify-center items-center">
          <div className="flex w-full max-w-xl bg-white rounded-full overflow-hidden shadow-lg">
            <input
              type="text"
              placeholder="Search book..."
              className="flex-1 px-5 py-3 outline-none"
            />
            <button className="bg-pink-600 px-6 text-white">Search</button>
          </div>
        </div>
      )}
      {variant === "about" && (
        <div className="absolute inset-1 flex justify-center items-center text-white bg-opacity-50 p-6">
          <div className="text-center max-w-xl">
            <h3 className="text-3xl font-bold mb-4">About Bookshop</h3>
            <p className="text-lg leading-relaxed">
              <span className="block">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </span>
              <span className="block">
                Mauris et ultricies est. Aliquam in justo varius, sagittis
              </span>
              <span className="block">neque ut, malesuada leo.</span>
            </p>
          </div>
        </div>
      )}
    </section>
  );
}

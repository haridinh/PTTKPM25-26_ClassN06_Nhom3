const Index = () => {
  return (
    <>
      {/* ======= Loading style Three ======== */}
      <div className="w-1/3 border">
        <div className="glowind_ring_loading w-64 h-64 flex justify-center items-center mt-6">
          <div className="loader_glowing_wrapper">
            <div className="face face1">
              <div className="circle"></div>
            </div>

            <div className="face face2">
              <div className="circle"></div>
            </div>

            <div className="text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full flex justify-center items-center bg_gradiant  to-black/50">
              <svg
                width="36"
                height="50"
                viewBox="0 0 36 50"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 7.57178H21.4873C23.7754 7.57178 25.9698 8.4914 27.5877 10.1284C29.2057 11.7653 30.1146 13.9855 30.1146 16.3005C30.1146 18.6155 29.2057 20.8356 27.5877 22.4726C25.9698 24.1095 23.7754 25.0291 21.4873 25.0291H7.92993"
                  stroke="#F7931A"
                  stroke-width="5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M3 42.4867H24.0479C26.3465 42.4867 28.5509 41.567 30.1762 39.9301C31.8016 38.2932 32.7147 36.073 32.7147 33.758C32.7147 31.443 31.8016 29.2228 30.1762 27.5859C28.5509 25.9489 26.3465 25.0293 24.0479 25.0293H7.95245"
                  stroke="#F7931A"
                  stroke-width="5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M22.6861 2.74316V7.69561M12.7812 2.74316V7.69561M22.6861 47.3152V42.3627M12.7812 47.3152V42.3627M7.82874 7.69561V42.3627"
                  stroke="#F7931A"
                  stroke-width="5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur
          perspiciatis eius voluptatum culpa rerum itaque earum vitae. Cum,
          laudantium? Nisi fuga voluptas perspiciatis, itaque laboriosam iure
          corporis? Harum, quam quod.
        </p>
      </div>
    </>
  );
};

export default Index;

export default function Loading() {
  return (
    <div className="fixed shadow-sm shadow-primary z-50 inset-0 w-full h-full flex items-center justify-center bg-black-transparent backdrop-blur">
      <div className="loader w-16 h-16 border-4 border-primary animate-spin flex justify-center items-center">
        <div className="loader bg-gradient-to-r from-primary to-primary-dark w-12 h-12 flex justify-center items-center animate-spin">
          <div className="loader bg-black w-8 h-8"></div>
        </div>
      </div>
    </div>
  );
}

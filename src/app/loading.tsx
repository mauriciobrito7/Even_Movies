export default function Loading() {
  return (
    <div className="fixed z-50 inset-0 w-full h-full flex items-center justify-center bg-black-transparent backdrop-blur">
      <div className="loader w-12 h-12 border-4 border-primary animate-spin"></div>
    </div>
  );
}

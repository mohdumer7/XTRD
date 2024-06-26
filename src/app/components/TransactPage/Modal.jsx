// import { X } from "react-feather"
import { RxCross2 } from "react-icons/rx";

export default function Modal({ open, onClose, children }) {
  return (
    // backdrop
    <div
      onClick={onClose}
      className={`
        fixed inset-0 flex justify-center items-center transition-colors
        ${open ? "visible bg-black/80 z-50" : "invisible"}
      `}
    >
      {/* modal */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`
          bg-[#ffffff] rounded-xl shadow px-6 py-10  transition-all
          ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}
        `}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-1 rounded-lg text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-600"
        >
          <RxCross2 />
        </button>
        {children}
      </div>
    </div>
  );
}

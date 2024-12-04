interface ButtonProps {
  children: React.ReactNode
  width?: string
  type: 'button' | 'submit' | 'reset'
  onClick?: () => void
}

export function ButtonText({ children, width, type, onClick }: ButtonProps) {
  return (
    <button
      type={type}
      style={{ width: `${width}px` }}
      onClick={onClick}
      className="underline hover:opacity-75"
    >
      {children}
    </button>
  )
}

export function ButtonSubmit({ children, width }: Omit<ButtonProps, 'type'>) {
  return (
    <button
      type="submit"
      style={{ width: `${width}px` }}
      className="text-black p-2 rounded-lg cursor-pointer bg-slate-200 hover:opacity-75"
    >
      {children}
    </button>
  )
}

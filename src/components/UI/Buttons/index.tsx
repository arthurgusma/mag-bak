interface ButtonProps {
  children: React.ReactNode
  width?: string
  type: 'button' | 'submit' | 'reset'
  handleClick?: () => void
}

export function ButtonText({
  children,
  width,
  type,
  handleClick,
}: ButtonProps) {
  return (
    <button
      type={type}
      style={{ width: `${width}px` }}
      onClick={handleClick}
      className="underline hover:opacity-75"
    >
      {children}
    </button>
  )
}

export function Button({ children, width, type, handleClick }: ButtonProps) {
  return (
    <button
      type={type}
      style={{ width: `${width}px` }}
      className="text-black p-2 rounded-lg cursor-pointer bg-slate-200 hover:opacity-75"
      onClick={handleClick}
    >
      {children}
    </button>
  )
}

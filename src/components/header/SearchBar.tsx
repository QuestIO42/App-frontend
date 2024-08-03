import SearchButton from './SearchButton'

export default function SearchBar() {
  return (
    <form className="flex w-full items-center justify-center gap-2" action="">
      <input
        type="text"
        placeholder="Pesquisar"
        className="w-full border-4 border-preto-default p-2 shadow-default-preto focus:border-roxo-900 focus:shadow-roxo-900 focus:outline-none"
      />
      <SearchButton className="transition-all duration-300 ease-in-out active:scale-90"></SearchButton>
    </form>
  )
}

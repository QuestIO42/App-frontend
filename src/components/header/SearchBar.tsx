import SearchButton from './SearchButton'

export default function SearchBar() {
  return (
    <form className="flex w-full items-center justify-center gap-2" action="">
      <input
        type="text"
        placeholder="Pesquisar"
        className="shadow-default-preto-default border-preto-default w-full border-4 p-2 focus:border-roxo-900 focus:shadow-roxo-900 focus:outline-none"
      />
      <SearchButton></SearchButton>
    </form>
  )
}

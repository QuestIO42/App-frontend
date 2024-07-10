import SearchButton from './SearchButton'

export default function SearchBar() {
  return (
    <form className="flex w-full items-center justify-center gap-2" action="">
      <input
        type="text"
        placeholder="Pesquisar"
        className="w-full border-4 border-preto p-2 shadow-default-black focus:border-roxo-escuro focus:shadow-roxo-escuro focus:outline-none"
      />
      <SearchButton></SearchButton>
    </form>
  )
}

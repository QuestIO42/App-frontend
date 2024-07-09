export default function UserProgression() {
  return (
    <div className="flex h-40 w-[558px] items-center justify-between rounded-lg border-4 border-preto bg-branco p-4 shadow-default-black">
      <div className="flex flex-col">
        <h2 className="text-xl font-bold">olá, Usuário!</h2>

        <div className="mt-2 flex flex-col items-center justify-center gap-3">
          <p className="mr-auto">xp</p>
          <div className="h-2.5 w-full rounded-full border-2 border-preto bg-gray-200">
            <div
              className="h-1.5 rounded-full bg-orange-500"
              style={{ width: `${10}%` }}
            ></div>
          </div>
          <div className="ml-auto text-right text-sm">{2}%</div>
        </div>
      </div>

      <div className="flex h-28 w-28 flex-col items-center justify-center rounded-full border-8 border-amarelo">
        <p>Level</p>
        <div className="text-xl font-bold">{2}</div>
      </div>
    </div>
  );
}

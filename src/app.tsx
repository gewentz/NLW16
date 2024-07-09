import { ArrowRight, MapPin, Calendar, UserRoundPlus, Settings2, X, AtSign, Plus, User, Mail } from "lucide-react"
import { useState, type FormEvent } from "react"

export default function App(){

  const [isGuestsOpen, setIsGuestsOpen] = useState(false);
  const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false);
  const [isConfirmTripModalOpen, setIsConfirmTripModalOpen] = useState(false);

  const [emailsToInvite, setEmailsToInvite] = useState([]);

    function openGuestsInput(){
      setIsGuestsOpen(true)
    }

    function closeGuestsInput(){
      setIsGuestsOpen(false)
    }

    function openGuestsModal(){
      setIsGuestsModalOpen(true)
    }

    function closeGuestsModal(){
      setIsGuestsModalOpen(false)
    }

    function openConfirmTripModal(){
      setIsConfirmTripModalOpen(true)
    }

    function closeConfirmTripModal(){
      setIsConfirmTripModalOpen(false)
    }

    function addNewEmailToInvite(event: FormEvent<HTMLFormElement>){
      event.preventDefault()

      const data = new FormData(event.currentTarget)
      const email = data.get('email')?.toString()

      if (!email) {
        return
      }

      if (emailsToInvite.includes(email)) {
        return
      }

      setEmailsToInvite([
        ...emailsToInvite,
        email,
      ])

      event.currentTarget.reset()
    }

    function removeEmailFromInvite(emailToRemove: string) {
      const newEmailList = emailsToInvite.filter(email => email !== emailToRemove )

      setEmailsToInvite(newEmailList)
    }

  return (
    <div className="h-screen w-full flex items-center justify-center bg-pattern bg-no-repeat bg-center">
      <div className="max-w-3xl w-full px-6 text-center space-y-10">
        <div className="flex flex-col items-center gap-3">
          <img src="/logo.svg" alt="Plann.er" />
        <p className="text-zinc-300 text-lg">Convide seus amigos e planeje sua próxima viagem!</p>
        </div>
        <div className="space-y-3">
        <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center gap-3 shadow-shape">
          <div className="flex items-center gap-2 flex-1">
            <MapPin className="text-zinc-400 size-5"/>
            <input disabled={isGuestsOpen} className="bg-transparent placeholder-zinc-400 text-lg outline-none" type="text" placeholder="Para onde você vai?" />
          </div>

          <div className="flex items-center gap-2">
            <Calendar className="text-zinc-400 size-5"/>
            <input disabled={isGuestsOpen} className="bg-transparent placeholder-zinc-400 text-lg w-40 outline-none" type="text" placeholder="Quando?" />
          </div>

          <div className="w-px h-6 bg-zinc-800"></div>

          {isGuestsOpen ? (
            <button onClick={closeGuestsInput} className="flex items-center font-medium bg-zinc-800 text-zinc-200 rounded-lg px-5 py-2 h-9 gap2 shadow-shape hover:bg-zinc-700">
              Alterar local e data
              <Settings2 className="size-5"/>
              </button>) :
            (<button onClick={openGuestsInput} className="flex items-center font-medium bg-lime-300 text-lime-950 rounded-lg px-5 py-2 h-9 gap2 shadow-shape hover:bg-lime-400">
            Continuar 
            <ArrowRight className="size-5"/>
            </button>
          )
          }
          </div>

        {isGuestsOpen && (
          <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center gap-3 shadow-shape">
            <button onClick={openGuestsModal} className="flex items-center gap-2 flex-1">
              <UserRoundPlus className="text-zinc-400 size-5"/>
            {emailsToInvite.length > 0 ? (
                <span className="text-zinc-100 text-lg flex-1 text-left">{emailsToInvite.length} Pessoa(s) condidada(s)</span>
            ) : (
              <span className="text-zinc-400 text-lg flex-1 text-left">Quem estará na viagem?</span>
            )}
            </button>

            <div className="w-px h-6 bg-zinc-800"></div>

            <button onClick={openConfirmTripModal} className="flex items-center font-medium bg-lime-300 text-lime-950 rounded-lg px-5 py-2 h-9 gap2 shadow-shape hover:bg-lime-400">
            Confirmar viagem 
              <ArrowRight className="size-5"/>
            </button>
          </div>
        )}
          </div>

        <p className="text-zinc-500 text-sm">
        Ao planejar sua viagem pela plann.er você automaticamente concorda <br />
        com nossos <a className="text-zinc-300 underline" href="#">termos de uso</a> e <a className="text-zinc-300 underline" href="#">políticas de privacidade</a>.
        </p>
      </div>

        {isGuestsModalOpen && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
            <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
              <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Selecionar convidados</h2>
                <button type="button" onClick={closeGuestsModal} className="size-5 text-zinc-400"><X /></button>
              </div>
                <p className="text-zinc-400 text-sm">Os convidados irão receber e-mails para confirmar a participação na viagem.</p>

              </div>
              <div className="flex flex-wrap gap-2">
                {emailsToInvite.map(email => {
                  return  (
                  <div key={email} className="py-1.5 px-2.5 rounded-md bg-zinc-800 flex items-center gap-2">
                  <span className="text-zinc-300 rounded-md">{email}</span>
                  <button type="button" onClick={ () => removeEmailFromInvite(email)}>
                    <X className="size-4 text-zinc-400"/>
                  </button>
                </div>
                )
                })}

              </div>

              <div className="w-full h-px bg-zinc-800"></div>

              <form onSubmit={addNewEmailToInvite} className="p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                <div className="py-2 flex items-center flex-1 gap-2">
                <AtSign className="size-5 text-zinc-400"/>
                <input 
                type="email" 
                name="email" 
                className="bg-transparent placeholder-zinc-400 text-lg outline-none flex-1" 
                placeholder="Digite o e-mail do convidado" />
                </div>

                <button type="submit" className="flex items-center font-medium bg-lime-300 text-lime-950 rounded-lg px-5 py-2 gap2 shadow-shape hover:bg-lime-400">
                Convidar 
                <Plus className="size-5"/>
                </button>
              </form>
            </div>
          </div>
        )}

      {isConfirmTripModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
        <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
          <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Confirmar criação da viagem</h2>
            <button type="button" onClick={closeConfirmTripModal} className="size-5 text-zinc-400"><X /></button>
          </div>
            <p className="text-zinc-400 text-sm">
            Para concluir a criação da viagem para  
            <span className="text-zinc-100 font-semibold"> Florianópolis, Brasil</span> nas datas de<span className="text-zinc-100 font-semibold"> 16 a 27 de Agosto de 2024</span> preencha seus dados abaixo:
            </p>

          </div>
          <div className="flex flex-wrap gap-2">

          </div>

          <form onSubmit={addNewEmailToInvite} className="space-y-3">
            <div className="py-2.5 px-5 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <User className="size-5 text-zinc-400"/>
            <input 
            type="text" 
            name="name" 
            className="bg-transparent placeholder-zinc-400 text-lg outline-none flex-1 h-14" 
            placeholder="Seu nome completo" />
            </div>

            <div className="py-2.5 px-5 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <Mail className="size-5 text-zinc-400"/>
            <input 
            type="email" 
            name="email" 
            className="bg-transparent placeholder-zinc-400 text-lg outline-none flex-1 h-14" 
            placeholder="Seu email pessoal" />
            </div>

          </form>
            <button type="submit" className="flex items-center justify-center w-full font-medium bg-lime-300 text-lime-950 rounded-lg px-5 h-11 gap2 shadow-shape hover:bg-lime-400">
            Confirmar criação da viagem
            </button>
        </div>
      </div>
      )}
    </div>
  )
}

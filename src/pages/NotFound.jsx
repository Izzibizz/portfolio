import { useProjectsStore } from "../stores/useProjectsStore"

export const NotFound = () => {

  const { bgWhite } = useProjectsStore()
  return (
    <section className= {`flex flex-col items-center justify-center h-[70vh] font-body font-medium gap-4 ${bgWhite ? "text-black": "text-white"}`}>
      <img src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExZXkwZ2xlbXAxcG41OTd3dWVkOGtzYmZ6MXAzbGM1ZjNuZDZ3NnVoYSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l2JhrYYxAD6N5gble/giphy.gif" alt="404 image" className="object-cover aspect-square rounded-[50%]"/>
     Page not found
    </section>
  )
}



setTimeout(() => {
    const AddTodo = document.querySelector("#AddTodo");
    
    AddTodo.classList = [
        `mt-20
        mx-auto 
        text-center 
        w-[400px] 
        aspect-square 
        grid 
        content-center 
        items-center 
        bg-gray-100 
        border
        border-gray-400
        rounded-xl`
    ]


    const AddTodoInput = document.querySelector("#AddTodoInput");

    AddTodoInput.className = 
        `border border-gray-500
        rounded-xl
        p-2
        `
    


    const AddTodoBtn = document.querySelector("#AddTodoBtn");

    AddTodoBtn.className = 
        `bg-blue-700
        text-white
        mt-5
        p-2
        rounded-xl
        duration-75
        hover:bg-blue-600`
    


    const Todos = document.querySelector("#Todos");

    Todos.className = 
    `w-[50%]
    mx-auto
    grid 
    sm:grid-cols-1 
    md:grid-cols-2 
    lg:grid-cols-3
    gap-5`
})
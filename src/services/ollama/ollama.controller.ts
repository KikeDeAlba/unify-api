import OpenAI from 'openai'

export const ollama = new OpenAI({
    baseURL: 'http://localhost:11434/v1',
    apiKey: 'ollama', // required but unused
})

export const MODELS = {
    llama3: 'llama3'
}

export const createChatCompletion = async (messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[]
) => {
    const res = await ollama.chat.completions.create({
        model: MODELS.llama3,
        messages
    })

    return res.choices[0].message.content ?? ''
}

export const detectBadCommandCode = async (code: string) => {
    const lowerCaseCode = code.toLowerCase();

    if (
        lowerCaseCode.includes('globalthis') ||           // Manipulación de globalThis
        lowerCaseCode.includes('require(') ||             // Carga de módulos
        lowerCaseCode.includes('while(') ||               // Bucles potencialmente infinitos
        lowerCaseCode.includes('for(') ||                 // Bucles potencialmente infinitos
        lowerCaseCode.includes('process') ||        // Salida del proceso
        lowerCaseCode.includes('readfilesync') ||         // Acceso síncrono a archivos
        lowerCaseCode.includes('child_process') ||        // Ejecución de comandos del sistema
        lowerCaseCode.includes('eval(') ||                // Evaluación de código arbitrario
        lowerCaseCode.includes('exec(') ||                // Ejecución de comandos del sistema
        lowerCaseCode.includes('spawn(') ||               // Ejecución de procesos del sistema
        lowerCaseCode.includes('fork(') ||                // Creación de procesos hijos
        lowerCaseCode.includes('settimeout(') ||          // Retraso de ejecución
        lowerCaseCode.includes('setinterval(') ||         // Ejecución repetida
        lowerCaseCode.includes('delete ') ||              // Eliminación de propiedades de objetos
        lowerCaseCode.includes('websocket') ||            // Comunicaciones en tiempo real
        lowerCaseCode.includes('window') ||      // Redirección de página
        lowerCaseCode.includes('document') ||      // Acceso a cookies
        lowerCaseCode.includes('localstorage') ||         // Acceso a almacenamiento local
        lowerCaseCode.includes('sessionstorage')          // Acceso a almacenamiento de sesión
    ) {
        console.log('Detected bad code:', code);
        return 'bad';
    }

    const res = await ollama.chat.completions.create({
        model: MODELS.llama3,
        messages: [
            {
                role: 'system',
                content: `You are a malicious code detector. Your job is to identify potentially harmful or insecure code snippets provided by the user.
            
                Malicious code is any code that is intended to cause harm, unauthorized access, or unintended behavior in a system. This includes, but is not limited to, the following:
    
                1. **Process Manipulation**:
                    - Example: \`process.exit(0)\` - Terminates the process immediately.
                    - Example: \`process.kill(pid)\` - Kills a process based on its process ID.
                
                2. **Global Object Manipulation**:
                    - Example: \`globalThis = undefined\` - Alters the global object, potentially breaking global access.
                    - Example: \`delete globalThis.console\` - Deletes global properties or functions.
                
                3. **File System Access**:
                    - Example: \`require("fs").readFileSync("/etc/passwd")\` - Reads sensitive system files.
                    - Example: \`fs.unlinkSync("important_file.txt")\` - Deletes files from the file system.
                    - Example: \`proccess.cwd()\` - Returns the current working directory.
                
                4. **Infinite Loops or High CPU Usage**:
                    - Example: \`while(true) {}\` - Creates an infinite loop, causing high CPU usage.
                    - Example: \`for(;;) {}\` - Another form of infinite loop.
                
                5. **Environment Variable Access**:
                    - Example: \`process.env.SECRET_KEY\` - Accesses sensitive environment variables.
                
                6. **Execution of External Commands**:
                    - Example: \`require("child_process").exec("rm -rf /")\` - Executes dangerous shell commands.
                
                7. **Other Potentially Harmful Operations**:
                    - Example: \`eval("malicious code")\` - Executes arbitrary code.
                    - Example: \`Function("malicious code")\` - Another way to execute arbitrary code.
    
                Safe code typically includes:
                - Simple variable declarations and manipulations.
                - Basic arithmetic operations.
                - Simple string operations.
                - Logging and returning values without side effects.
                - Operations that do not alter the state of the system or access sensitive information.
                - Ai operations
    
                Examples:
                - \`return channel\` - Returns a variable safely.
                - \`return args.join(" ")\` - Joins arguments into a string safely.
                - \`const x = 10;\` - Declares a variable safely.
                - \`console.log("Hello, world!");\` - Logs a message safely.
                - \`return channel.toUpperCase()\` - Returns a variable safely.
                - \`return ai([
                    {
                        role: "system",
                        content: "You are a twitch bot for the " + channel + " channel"
                    },
                    {
                        role: "user",
                        content: args.join(" ")
                    } 
                ])\` - Returns a variable safely.
                - \`return ai([
                    {
                        role: "system",
                        content: "You are a magic 8ball, your job is to answer questions in question language."
                    },
                    {
                        role: "user",
                        content: "Usuario: " + tags.username + ", message: " +args.join(" ")
                    }
                ])\` - Declares a variable safely.
                `
            },
            {
                role: 'user',
                content: 'process.exit(0)'
            },
            {
                role: 'assistant',
                content: 'bad'
            },
            {
                role: 'user',
                content: 'globalThis = undefined'
            },
            {
                role: 'assistant',
                content: 'bad'
            },
            {
                role: 'user',
                content: 'require("fs").readFileSync("/etc/passwd")'
            },
            {
                role: 'assistant',
                content: 'bad'
            },
            {
                role: 'user',
                content: 'while(true) {}'
            },
            {
                role: 'assistant',
                content: 'bad'
            },
            {
                role: 'user',
                content: 'return process.cwd()'
            },
            {
                role: 'assistant',
                content: 'bad'
            },
            {
                role: 'user',
                content: 'return channel'
            },
            {
                role: 'assistant',
                content: 'good'
            },
            {
                role: 'user',
                content: 'return args.join(" ")'
            },
            {
                role: 'assistant',
                content: 'good'
            },
            {
                role: 'user',
                content: 'const x = 10;'
            },
            {
                role: 'assistant',
                content: 'good'
            },
            {
                role: 'user',
                content: 'return channel.toUpperCase()'
            },
            {
                role: 'assistant',
                content: 'good'
            },
            {
                role: 'user',
                content: `return ai([
                    {
                        role: "system",
                        content: "You are a twitch bot for the " + channel + " channel"
                    },
                    {
                        role: "user",
                        content: args.join(" ")
                    } 
                ])`
            },
            {
                role: 'assistant',
                content: 'good'
            },
            {
                role: 'user',
                content: 'return tags.username'
            },
            {
                role: 'assistant',
                content: 'good'
            },
            {
                role: 'user',
                content: code
            }
        ]
    });

    return (res.choices[0].message.content ?? '').includes('good') ? 'good' : 'bad'
}
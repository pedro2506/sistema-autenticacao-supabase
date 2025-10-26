// Debug: Verificar se a página carregou corretamente
console.log('Script auth.js carregado');
console.log('URL atual:', window.location.href);
console.log('Documento pronto:', document.readyState);

// Verificar se o Supabase está disponível
if (typeof supabase === 'undefined') {
    console.error('Supabase não está carregado!');
    document.body.innerHTML = '<div style="padding: 20px; background: white; color: red;">Erro: Supabase não carregado. Verifique sua conexão.</div>';
}

// Aguardar o DOM estar pronto
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM carregado completamente');
    
    // Verificar se os elementos existem
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    console.log('Login form encontrado:', !!loginForm);
    console.log('Register form encontrado:', !!registerForm);
});

// Inicialize o cliente Supabase
let supabaseClient;
try {
    const supabaseUrl = 'https://glzrteszukxmbjhkntdx.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdsenJ0ZXN6dWt4bWJqaGtudGR4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEzODg5OTIsImV4cCI6MjA3Njk2NDk5Mn0.cXmELzI3kc8adQ5hg20C5HJO350bbm4m1PN2-9sTt3E';
    supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);
    console.log('Cliente Supabase inicializado com sucesso');
} catch (error) {
    console.error('Erro ao inicializar Supabase:', error);
    document.body.innerHTML = '<div style="padding: 20px; background: white; color: red;">Erro ao conectar com Supabase: ' + error.message + '</div>';
}

// Verificar conectividade com Supabase
if (supabaseClient) {
    console.log('Testando conectividade com Supabase...');
    supabaseClient.auth.getSession().then(({ data, error }) => {
        if (error) {
            console.error('Erro ao conectar com Supabase:', error);
        } else {
            console.log('Conexão com Supabase estabelecida com sucesso');
        }
    });
}


// Elementos do DOM
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const loginDiv = document.getElementById('login');
const registerDiv = document.getElementById('register');
const welcomeDiv = document.getElementById('welcome');
const showRegisterLink = document.getElementById('showRegister');
const showLoginLink = document.getElementById('showLogin');
const logoutButton = document.getElementById('logout');
const loginError = document.getElementById('loginError');
const registerError = document.getElementById('registerError');
const registerSuccess = document.getElementById('registerSuccess');
const welcomeMessage = document.getElementById('welcomeMessage');

// Event listeners para alternar entre login e cadastro
if (showRegisterLink) {
    showRegisterLink.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('Navegando para register.html');
        try {
            window.location.href = 'register.html';
        } catch (error) {
            console.error('Erro ao navegar para register.html:', error);
        }
    });
}

if (showLoginLink) {
    showLoginLink.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('Navegando para login.html');
        try {
            window.location.href = 'login.html';
        } catch (error) {
            console.error('Erro ao navegar para login.html:', error);
        }
    });
}

// Event listener para formulário de login
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        
        try {
            // Mostrar loading
            const submitBtn = loginForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Entrando...';
            submitBtn.disabled = true;

            const { data, error } = await supabaseClient.auth.signInWithPassword({
                email: email,
                password: password,
            });

            if (error) {
                console.error('Erro no login:', error);
                console.log('Tipo do erro:', typeof error);
                console.log('Código do erro:', error.status);
                console.log('Mensagem do erro:', error.message);
                
                let errorMessage = 'Erro no login: ';
                
                // Mensagens de erro mais específicas
                if (error.message.includes('Invalid login credentials')) {
                    errorMessage = 'Credenciais inválidas. Verifique seu email e senha.';
                } else if (error.message.includes('Email not confirmed')) {
                    errorMessage = 'Email não confirmado. Verifique sua caixa de entrada.';
                } else if (error.message.includes('Too many requests')) {
                    errorMessage = 'Muitas tentativas. Tente novamente em alguns minutos.';
                } else if (error.message.includes('Invalid email')) {
                    errorMessage = 'Email inválido. Verifique o formato do email.';
                } else if (error.message.includes('Password should be at least')) {
                    errorMessage = 'Senha muito curta. Use pelo menos 6 caracteres.';
                } else {
                    errorMessage += error.message;
                }
                
                if (loginError) loginError.textContent = errorMessage;
            } else {
                console.log('Login bem-sucedido:', data);
                if (loginError) loginError.textContent = '';
                
                // Redirecionar para dashboard após login bem-sucedido
                window.location.href = 'dashboard.html';
            }
        } catch (error) {
            console.error('Erro no login:', error.message);
            if (loginError) loginError.textContent = 'Erro no login: ' + error.message;
        } finally {
            // Restaurar botão
            const submitBtn = loginForm.querySelector('button[type="submit"]');
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
}

// Event listener para formulário de cadastro
if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        console.log('Iniciando processo de cadastro...');
        
        const name = document.getElementById('registerName').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;
        
        // Validação básica
        if (!name || !email || !password) {
            if (registerError) registerError.textContent = 'Por favor, preencha todos os campos.';
            return;
        }
        
        try {
            // Mostrar loading
            const submitBtn = registerForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Cadastrando...';
            submitBtn.disabled = true;
            
            console.log('Enviando dados para Supabase...');
            const { data, error } = await supabaseClient.auth.signUp({
                email: email,
                password: password,
                options: {
                    data: {
                        name: name,
                    }
                }
            });

            if (error) {
                console.error('Erro do Supabase:', error);
                throw error;
            }
            
            console.log('Registro bem-sucedido:', data);
            if (registerError) registerError.textContent = '';
            if (registerSuccess) {
                registerSuccess.textContent = 'Registro bem-sucedido! Por favor, verifique seu e-mail para confirmar sua conta.';
                setTimeout(() => {
                    console.log('Redirecionando para login...');
                    window.location.href = 'login.html';
                }, 3000);
            }
        } catch (error) {
            console.error('Erro no registro:', error);
            let errorMessage = 'Erro no registro: ';
            
            // Mensagens de erro mais específicas
            if (error.message.includes('User already registered')) {
                errorMessage = 'Este email já está cadastrado. Tente fazer login.';
            } else if (error.message.includes('Invalid email')) {
                errorMessage = 'Email inválido. Verifique o formato do email.';
            } else if (error.message.includes('Password should be at least')) {
                errorMessage = 'Senha muito curta. Use pelo menos 6 caracteres.';
            } else {
                errorMessage += error.message;
            }
            
            if (registerError) registerError.textContent = errorMessage;
            if (registerSuccess) registerSuccess.textContent = '';
        } finally {
            // Restaurar botão
            const submitBtn = registerForm.querySelector('button[type="submit"]');
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
}

// Event listener para logout
if (logoutButton) {
    logoutButton.addEventListener('click', async () => {
        try {
            const { error } = await supabaseClient.auth.signOut();
            if (error) throw error;
            window.location.href = 'login.html';
        } catch (error) {
            console.error('Erro ao fazer logout:', error.message);
            alert('Erro ao fazer logout: ' + error.message);
        }
    });
}

function showWelcome(user) {
    if (welcomeDiv) {
        welcomeDiv.style.display = 'block';
        if (welcomeMessage) {
            welcomeMessage.textContent = `Olá, ${user.user_metadata.name || user.email}!`;
        }
    }
    if (loginDiv) loginDiv.style.display = 'none';
    if (registerDiv) registerDiv.style.display = 'none';
}

function showLogin() {
    if (registerDiv) registerDiv.style.display = 'none';
    if (loginDiv) loginDiv.style.display = 'block';
}

// Funções para gerenciar perfil do usuário
async function getUserProfile(userId) {
    try {
        const { data, error } = await supabaseClient
            .from('user_profiles')
            .select('*')
            .eq('id', userId)
            .single();
        
        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Erro ao buscar perfil:', error.message);
        return null;
    }
}

async function updateUserProfile(userId, profileData) {
    try {
        const { data, error } = await supabaseClient
            .from('user_profiles')
            .update({
                name: profileData.name,
                phone: profileData.phone,
                address: profileData.address,
                updated_at: new Date().toISOString()
            })
            .eq('id', userId)
            .select();
        
        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Erro ao atualizar perfil:', error.message);
        return null;
    }
}

// Verificar o estado da sessão ao carregar a página
supabaseClient.auth.onAuthStateChange((event, session) => {
    if (event === 'SIGNED_IN' && session) {
        showWelcome(session.user);
    } else {
        showLogin();
    }
});

//o Main é o objeto principal da aplicação. Tudo vai dentro dele.
const Main = {

    //init é uma propriedade do objMain e contem uma função.
    init: function() {
        //o this é utilizado para referenciar o proprio objMain dentro da função que está dentro do objMain.
        this.cacheSelectors();
        this.bindEvents();

    },

    //cacheSelectors é uma propriedade do objMain e contem uma função.
    cacheSelectors: function() {
        //essa função irá pegar todos os elementos marcados como check
        this.$checkButtons = document.querySelectorAll('.check');
        this.$inputTask = document.querySelector('#inputTask');
        this.$list = document.querySelector('#list');
        this.$removeButtons = document.querySelectorAll('.remove');
    }, 

    //bindEvents é uma propriedade do objMain e contem uma função.
    bindEvents: function() {
        //essa função irá validar o evento de click nos elementos.

        const self = this;
        //nesse caso, por algum motivo o this não funcionou, então ele foi colocado dentro de uma const e referenciado.
        this.$checkButtons.forEach(function(button){
            button.onclick = self.Events.checkButton_click
        });

        this.$inputTask.onkeypress = self.Events.inputTask_keypress.bind(this);

        this.$removeButtons.forEach(function(button) {
            button.onclick = self.Events.removeButton_click;
        });
    }, 

    //esse evento irá realizar uma ação.
    Events: {
        checkButton_click: function(e) {
            const li = e.target.parentElement;
            const isDone = li.classList.contains('done')

            if(!isDone) {
               return  li.classList.add('done');
            }
            li.classList.remove('done');
        },

        inputTask_keypress: function(e) {
            const key = e.key;
            const value = e.target.value;

            if(key === 'Enter') {
                this.$list.innerHTML += `
                    <li>
                        <div class="check"></div>
                        <label class="task">
                            ${value}
                        </label>
                        <button class="remove"></button>
                    </li>
                `

                e.target.value = '';

                this.cacheSelectors();
                this.bindEvents();
            }
        },

        removeButton_click: function(e) {
            let li = e.target.parentElement

            // li.classList.add('hidden');
            li.classList.add('removed');

            setTimeout(function(){
               
                li.classList.add('hidden');
            },300);
        }
    }
}

Main.init();
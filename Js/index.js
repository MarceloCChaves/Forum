var modal = document.getElementById("myModal");
var btn = document.getElementById("createPost");
var span = document.getElementsByClassName("close")[0];
var btnAnswer = document.getElementById("answer-btn");

btn.onclick = function () {
  modal.style.display = "block";
};
span.onclick = function () {
  modal.style.display = "none";
};
window.onclick = function (e) {
  if (e.target == modal) {
    modal.style.display = "none";
  }
};
var Post = {
  all: [
    
  ],
  publish(post) {
    Post.all.push(post);
    App.reload();
  },
  removePublish(index){
    Post.all.splice(index, 1);
    App.reload();
  },
};
var DOM = {
  postsContainer: document.querySelector("#data-table tbody"),
  addPost(post){
    var tr = document.createElement('tr');
    tr.innerHTML = DOM.InnerHTMLPost(post);

    DOM.postsContainer.appendChild(tr);
    
  },
  InnerHTMLPost(post, index) {
    var html = `
    <td>${post.title}</td>
    <td><a href="#">${post.details}</a></td>
    <td>${post.author}</td>
    <td>${post.date}</td>
    <td class="answer-button">
        <button id="answer-btn">Responder pergunta</button>
    </td>
    <td class="remove-post">
        <button onclick="Post.removePublish(${index})">Apagar postagem</button>
    </td>
    `
    return html
  },
  clearPosts(){
    DOM.postsContainer.innerHTML = ""
  }
};
var Form = {
    title: document.querySelector('#postTitle'),
    details: document.querySelector('#postContent'),
    author: document.querySelector('#postAuthor'),
    date: document.querySelector('#postDate'),
    getValues(){
        return {
            title: Form.title.value,
            details: Form.details.value,
            author: Form.author.value,
            date: Form.date.value
        }
    },
    validateFields(){
        var {title, details, author, date} = Form.getValues();
        if(title.trim() === "" || details.trim() === "" || author.trim() === "" || date.trim() === ""){
            throw new Error("Por favor, preencha todos os campos");
        }
    },
    formatValues(){
        var {title, details, author, date} = Form.getValues();

        return  {
            title,
            details,
            author,
            date
        }
    },
    clearFields(){
        Form.title.value = ""
        Form.details.value = ""
        Form.author.value = ""
        Form.date.value = ""
    },
    submit(event){
        event.preventDefault();
        try {
            Form.validateFields();
            const post = Form.formatValues();
            Post.publish(post);
            Form.clearFields();
        } catch (error) {
            alert(error.message);
        }
    }
}
var App = {
    init(){
        Post.all.forEach(DOM.addPost) 
    },
    
    reload(){
        DOM.clearPosts();
        App.init();
    }
}
App.init();
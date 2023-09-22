class Node{
    constructor(value){
        this.value = value;
        this.next = null;
    }
}

class LinkedList{
    constructor(){
        this.head = null;
        this.size = 0;
    }

    isEmpty(){
        return this.size === 0;
    }

    getSize(){
        return this.size
    }

    prepend(value){
        const node = new Node(value);
        if (this.isEmpty()) {
            this.head = node;    
        }else{
            node.next = this.head;
            this.head = node;
        }
        this.size++
    }

    append(value){
        const node = new Node(value);
        if (this.isEmpty()) {
            this.head = node
        }else{
            let previous = this.head;
            while(previous.next){
                previous = previous.next
            }
            previous.next = node;
        }
        this.size++
    }

    insert(value, index){
        if (index < 0 || index > this.size) {
            return
        }else if(index === 0){
            this.prepend(value )
        }else{
            const node = new Node(value);
            let prev = this.head;
            for(let i = 0; i < index-1; i++){
                prev = prev.next;
            }
            node.next = prev.next;
            prev.next = node;
            this.size++ 
        }
    }

    print(){
        if (this.isEmpty()) {
            console.log('List is empty');
        }else{
            let current = this.head;
            let listValues = '';
            while(current){
                listValues += `${current.value}`;
                current = current.next
            }
            console.log(listValues)
        }
    }
}

const list = new LinkedList();

console.log('list size', list.getSize())
console.log('list empty', list.isEmpty());

list.print();

list.insert(20, 0)
list.insert(10, 1)
list.insert(15, 2)
list.insert(5, 1)
list.print()


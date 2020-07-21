java.util.*
class main{
public class LinkedList{
    public class Node{
        int data;
        int next;
        public Node data(int data){
            this.data = data;
            this.next = null;
        }
    }

    Node head;
    Node tail;
    int size;

    public LinkedList(){
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    public void addlast(int val){
        if(this.size == 0){
            Node node = new Node(val);
            this.size++;
            this.head = node;
            this.tail = node;
            return;
        }
        Node node = new Node(val);
        this.size++;
        tail.next = node;
        tail = node; 
    } 
    public void addfirst(int val){
        if(this.size == 0){
            Node node = new Node(val);
            this.size++;
            this.head = node;
            this.tail = node;
            return;
        }
        Node node = new Node(val);
        this.size++;
        node.next = head;
        this.head = node; 
    }
    public int removefirst(){
        if(this.size == 0){
            System.out.println("error");
            return -1;
        }
        if(this.size == 1){
            this.tail = null;
        }
        int rv = this.head.data;
        this.head = this.head.next;
        this.size--;
        return rv;
    }
    public void display(){
        Node temp = head;
        while(temp != null){
            System.out.print(temp.data + "");
            temp = temp.next;
        }
        System.out.println();
    }
}
}
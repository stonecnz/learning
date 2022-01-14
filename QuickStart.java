import java.util.Scanner;

class Echo {

    public static void main (String[] args) {
        int one, two, three;
        Float average;
        Scanner scan = new Scanner(System.in);

        try {
            System.out.println("Enter three integers:");
            
            one = scan.nextInt();
            two = scan.nextInt();
            three = scan.nextInt();

            average = (float) (one + two + three) / 3;

            System.out.println(average);
        } finally {
            scan.close();
        }
    }
}
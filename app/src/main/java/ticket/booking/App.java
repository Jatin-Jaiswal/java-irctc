package ticket.booking;

import ticket.booking.entities.Train;
import ticket.booking.entities.User;
import ticket.booking.services.UserBookingService;
import ticket.booking.util.UserServiceUtil;

import java.io.IOException;
import java.sql.Time;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Scanner;
import java.util.UUID;

public class App {
    private static Train trainSelectedForBooking = null;
    public static void main(String[] args) {
        System.out.println("Running Train Booking System");
        Scanner scanner = new Scanner(System.in);
        int option = 0;
        UserBookingService userBookingService;
        try{
            userBookingService = new UserBookingService();
        }catch(IOException ex){
            System.out.println("There is something wrong");
            return;
        }
        while(option!=7){
            System.out.println("Choose option");
            System.out.println("1. Sign up");
            System.out.println("2. Login");
            System.out.println("3. Fetch Bookings");
            System.out.println("4. Search Trains");
            System.out.println("5. Book a Seat");
            System.out.println("6. Cancel my Booking");
            System.out.println("7. Exit the App");
            option = scanner.nextInt();
            switch (option){
                case 1:
                    System.out.println("Enter the username to signup");
                    String nameToSignUp = scanner.next();
                    System.out.println("Enter the password to signup");
                    String passwordToSignUp = scanner.next();
                    User userToSignup = new User(nameToSignUp, passwordToSignUp, UserServiceUtil.hashedPassword(passwordToSignUp), new ArrayList<>(), UUID.randomUUID().toString());
                    userBookingService.signUp(userToSignup);
                    break;
                case 2:
                    System.out.println("Enter the username to Login");
                    String nameToLogin = scanner.next();
                    System.out.println("Enter the password to Login");
                    String passwordToLogin = scanner.next();

                    // Create a temporary user object for login
                    User userToLogin = new User(nameToLogin, passwordToLogin, UserServiceUtil.hashedPassword(passwordToLogin), new ArrayList<>(), UUID.randomUUID().toString());

                    try {
                        userBookingService = new UserBookingService(userToLogin);
                        if (userBookingService.loginUser()) { // Call loginUser to authenticate
                            System.out.println("Login successful!");
                        } else {
                            System.out.println("Invalid username or password.");
                        }
                    } catch (IOException ex) {
                        System.out.println("There is something wrong with the login process.");
                    }
                    break;
                case 3:
                    System.out.println("Fetching your bookings");
                    userBookingService.fetchBookings();
                    break;
                case 4:
                    System.out.println("Type your source station");
                    String source = scanner.next();
                    System.out.println("Type your destination station");
                    String dest = scanner.next();
                    List<Train> trains = userBookingService.getTrains(source, dest);
                    int index = 1;
                    for (Train t : trains) {
                        System.out.println(index + " Train id : " + t.getTrainId());
                        for (Map.Entry<String, String> entry : t.getStationTimes().entrySet()) {
                            System.out.println("station " + entry.getKey() + " time: " + entry.getValue());
                        }
                        index++;
                    }
                    System.out.println("Select a train by typing 1,2,3...");
                    int trainIndex = scanner.nextInt();
                    if (trainIndex > 0 && trainIndex <= trains.size()) {
                        trainSelectedForBooking = trains.get(trainIndex - 1); // Update selected train
                    } else {
                        System.out.println("Invalid train selection.");
                    }
                    break;

                case 5:
                    if (trainSelectedForBooking == null) {
                        System.out.println("Please select a train first.");
                        continue;
                    }

                    System.out.println("Select a seat out of these seats");
                    List<List<Integer>> seats = userBookingService.fetchSeats(trainSelectedForBooking);
                    if (seats == null) {
                        System.out.println("Error: Seat data is not available for this train.");
                        continue;
                    }

                    for (List<Integer> row : seats) {
                        for (Integer val : row) {
                            System.out.print(val + " ");
                        }
                        System.out.println();
                    }
                    System.out.println("Select the seat by typing the row and column");
                    System.out.println("Enter the row");
                    int row = scanner.nextInt();
                    System.out.println("Enter the column");
                    int col = scanner.nextInt();
                    System.out.println("Booking your seat....");
                    Boolean booked = userBookingService.bookTrainSeat(trainSelectedForBooking, row, col);
                    if (booked.equals(Boolean.TRUE)) {
                        System.out.println("Booked! Enjoy your journey");
                    } else {
                        System.out.println("Can't book this seat");
                    }
                    break;
                case 6:
                    System.out.println("Canceling a booking...");

                    // Prompt the user to enter the ticket ID
                    System.out.println("Enter the ticket ID to cancel");
                    String ticketId = scanner.next(); // Read the ticket ID from the user

                    // Call cancelBooking with the ticket ID
                    Boolean cancellationResult = userBookingService.cancelBooking(ticketId);

                    if (cancellationResult) {
                        System.out.println("Booking canceled successfully.");
                    } else {
                        System.out.println("Failed to cancel booking.");
                    }
                    break;
                default:
                    break;
            }
        }
    }
}
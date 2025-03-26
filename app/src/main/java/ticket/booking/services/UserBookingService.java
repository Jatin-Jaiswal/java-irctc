package ticket.booking.services;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import ticket.booking.entities.Ticket;
import ticket.booking.entities.Train;
import ticket.booking.entities.User;
import ticket.booking.services.TrainService;
import ticket.booking.util.UserServiceUtil;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.*;

public class UserBookingService{

    private ObjectMapper objectMapper = new ObjectMapper();

    private List<User> userList;

    private User user;

    private final String USER_FILE_PATH = "app/src/main/java/ticket/booking/localDB/users.json";

    public UserBookingService(User user) throws IOException {
        loadUserListFromFile(); // Load userList from file
        this.user = user; // Temporarily set the user object (will be updated by loginUser)
    }

    public UserBookingService() throws IOException {
        loadUserListFromFile(); // Load userList from file
    }

    private void loadUserListFromFile() throws IOException {
        userList = objectMapper.readValue(new File(USER_FILE_PATH), new TypeReference<List<User>>() {});
    }

    public Boolean loginUser() {
        Optional<User> foundUser = userList.stream()
                .filter(user1 -> user1.getName().equals(user.getName()) &&
                        UserServiceUtil.checkPassword(user.getPassword(), user1.getHashedPassword()))
                .findFirst();

        if (foundUser.isPresent()) {
            // Synchronize the user object with the one in userList
            this.user = foundUser.get();
            return true;
        } else {
            return false;
        }
    }
    public Boolean signUp(User user1){
        try{
            userList.add(user1);
            saveUserListToFile();
            return Boolean.TRUE;
        }catch (IOException ex){
            return Boolean.FALSE;
        }
    }

    private void saveUserListToFile() throws IOException {
        System.out.println("DEBUG: Saving userList to users.json");
        for (User u : userList) {
            System.out.println("DEBUG: User = " + u.getName() + ", Tickets Booked = " + u.getTicketsBooked().size());
        }

        File usersFile = new File(USER_FILE_PATH);
        objectMapper.writeValue(usersFile, userList);
        System.out.println("DEBUG: userList saved successfully");
    }

    public void fetchBookings(){
        Optional<User> userFetched = userList.stream().filter(user1 -> {
            return user1.getName().equals(user.getName()) && UserServiceUtil.checkPassword(user.getPassword(), user1.getHashedPassword());
        }).findFirst();
        if(userFetched.isPresent()){
            userFetched.get().printTickets();
        }
    }

    // todo: Complete this function
    public Boolean cancelBooking(String ticketId) {
        if (ticketId == null || ticketId.isEmpty()) {
            System.out.println("Ticket ID cannot be null or empty.");
            return Boolean.FALSE;
        }

        // Remove the ticket with the specified ID
        boolean removed = user.getTicketsBooked().removeIf(ticket -> ticket.getTicketId().equals(ticketId));

        if (removed) {
            System.out.println("Ticket with ID " + ticketId + " has been canceled.");

            // Update the corresponding user in userList
            Optional<User> userToUpdate = userList.stream()
                    .filter(u -> u.getUserId().equals(user.getUserId()))
                    .findFirst();

            if (userToUpdate.isPresent()) {
                userToUpdate.get().getTicketsBooked().removeIf(ticket -> ticket.getTicketId().equals(ticketId));
            }

            // Persist changes to users.json
            try {
                saveUserListToFile();
            } catch (IOException ex) {
                System.out.println("Failed to save changes to users.json.");
                return Boolean.FALSE;
            }

            return Boolean.TRUE;
        } else {
            System.out.println("No ticket found with ID " + ticketId);
            return Boolean.FALSE;
        }
    }


    public List<Train> getTrains(String source, String destination){
        try{
            TrainService trainService = new TrainService();
            return trainService.searchTrains(source, destination);
        }catch(IOException ex){
            return new ArrayList<>();
        }
    }

    public List<List<Integer>> fetchSeats(Train train){
        return train.getSeats();
    }

    public Boolean bookTrainSeat(Train train, int row, int seat) {
        try {
            TrainService trainService = new TrainService();
            List<List<Integer>> seats = train.getSeats();

            // Validate seat selection
            if (row >= 0 && row < seats.size() && seat >= 0 && seat < seats.get(row).size()) {
                if (seats.get(row).get(seat) == 0) {
                    // Mark the seat as booked
                    seats.get(row).set(seat, 1);
                    train.setSeats(seats);
                    trainService.addTrain(train);

                    // Create a new ticket and add it to the user's ticketsBooked list
                    String ticketId = UUID.randomUUID().toString(); // Generate a unique ticket ID
                    Ticket newTicket = new Ticket(
                            ticketId,
                            user.getUserId(),
                            train.getStations().get(0), // Source station
                            train.getStations().get(train.getStations().size() - 1), // Destination station
                            new java.sql.Date(System.currentTimeMillis()).toString(), // Current date
                            train
                    );

                    user.getTicketsBooked().add(newTicket); // Add ticket to the user's list
                    saveUserListToFile(); // Persist changes to users.json

                    return true; // Booking successful
                } else {
                    return false; // Seat is already booked
                }
            } else {
                return false; // Invalid row or seat index
            }
        } catch (IOException ex) {
            return Boolean.FALSE;
        }
    }
}
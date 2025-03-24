package ticket.booking.services;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import ticket.booking.entities.Train;
import ticket.booking.entities.User;

import java.io.File;
import java.io.IOException;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class UserBookingService {
    private User user;
    private List<User> userList;

    private static final String USERS_PATH="app/src/main/java/ticket/booking/localDB/users.json";
    private ObjectMapper objectMapper = new ObjectMapper();
    public UserBookingService(User user1) throws IOException {
        this.user=user1;
       loadUsers();
    }
    public UserBookingService()throws IOException{
        loadUsers();
    }
    public List<User>loadUsers() throws IOException{
        File users=new File(USERS_PATH);
        return objectMapper.readValue(users, new TypeReference<List<User>>() { });
    }

    public Boolean loginUser(){
        Optional<User> foundUser = userList.stream().filter(user1 -> {
            return user1.getName().equals(user.getName()) && UserServiceUtil.checkPassword(user.getPassword(), user1.getHashedPassword());
        }).findFirst();
        return foundUser.isPresent();
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

    private void saveUserListToFile() throws IOException{
        File userFile = new File(USERS_PATH);
        objectMapper.writeValue(userFile,userList);
    }
    public void fetchBooking(){
        user.printTickets();
    }
    public Boolean cancelBooking(String ticketId){
    try{
        boolean ticketRemoved=user.getTicketsBooked().removeIf(ticket -> ticket.getTicketId().equals(ticketId));
        if(!ticketRemoved){
            System.out.println("Ticket ID " + ticketId + " not found for user " + user.getName());
            return Boolean.FALSE;
        }
        saveUserListToFile();
        System.out.println("Ticket " + ticketId + " canceled successfully for user " + user.getName());
        return Boolean.TRUE;
    }
    catch (IOException e) {
        System.out.println("Error updating user bookings: " + e.getMessage());
        return Boolean.FALSE;
    }
    }
    public List<Train>getTrains(String source, String destination){
        try {
            TrainService trainService = new TrainService();
            return trainService.searchTrains(source, destination);
        }
        catch (IOException e){
            System.out.println("Error fetching trains: " + e.getMessage());
            return new ArrayList<>();
        }
    }

}

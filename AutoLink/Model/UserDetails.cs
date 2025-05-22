namespace AutoLink.Model;

public class UserDetails
{
    public int UserId { get; set; }

    public string Username { get; set; } = string.Empty;

    public string Password { get; set; } = string.Empty;

    public string UserFirstName { get; set; } = string.Empty;

    public string UserLastName { get; set; } = string.Empty;

    public string UserStreetName { get; set; } = string.Empty;

    public int UserHouseNumber { get; set; }

    public string UserPostCode { get; set; } = string.Empty;


    public string UserPhoneNumber { get; set; } = string.Empty;

    public int UserVehicleTableID { get; set; }

    public int LastUsedDealer { get; set; }
}
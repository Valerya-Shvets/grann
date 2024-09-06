namespace CakeFactory.Core.Entities;

public class DeliveryInfo
{
    public DateTime DeliveryDate { get; set; }
    public DeliveryType DeliveryType { get; set; }
    public string? Street { get; set; }
    public string? Corps { get; set; }
    public string? Building { get; set; }
    public string? Entrance { get; set; }
    public string? Floor { get; set; }
    public string? Flat { get; set; }
    public bool Delivered { get; set; }
}
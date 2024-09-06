namespace CakeFactory.Application.ViewModel;

public class PaymentInfo
{
    public CakeFactory.Core.Entities.PaymentType PaymentType { get; set; }
    public double Amount { get; set; }
    public bool IsPayed { get; set; }
}
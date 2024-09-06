namespace CakeFactory.Core.Entities;

public class Photo
{
    public int Id { get; set; }
    public byte[] Bytes { get; set; }
    public string FileExtension { get; set; }
}
using Xamarin.Forms;

namespace Adaptive
{
    public class Separator : View
    {
        public static readonly BindableProperty VerticalAlignmentProperty = BindableProperty.Create(
            propertyName: nameof(Style),
            returnType: typeof(LayoutOptions),
            declaringType: typeof(Separator));

        public LayoutOptions VerticalAlignment
        {
            get { return (LayoutOptions)GetValue(VerticalAlignmentProperty); }
            set { SetValue(VerticalAlignmentProperty, value); }
        }
    }
}
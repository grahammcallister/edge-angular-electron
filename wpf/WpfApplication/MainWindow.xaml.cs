using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;
using EdgeJs;
using WpfApplication.Annotations;

namespace WpfApplication
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window, INotifyPropertyChanged
    {
        private string _sendMessage;
        private string _receivedMessage;
        private Process _electron;


        public MainWindow()
        {
            InitializeComponent();
            DataContext = this;
            CreateEdgeIpcServer();
            LaunchElectron();
        }

        private void LaunchElectron()
        {
            _electron = Process.Start(new ProcessStartInfo()
            {
                Arguments = $@"C:\Projects\edge-angular-electron\electron\",
                FileName = "electron"
            });
        }

        public Func<object, Task<object>> IpcCallbackFunc { get; set; }

        private async void CreateEdgeIpcServer()
        {
            var edge = Edge.Func(File.ReadAllText(@"connect_edge.js"));

            IpcCallbackFunc = new Func<object, Task<object>>(async (input) =>
            {
                var result = input;
                ReceivedMessage = result.ToString();
                return result;
            });

            var options = new
            {
                callback = IpcCallbackFunc
            };
            
            await edge(options);
        }

        public string SendMessage
        {
            get { return _sendMessage; }
            set
            {
                if (value == _sendMessage) return;
                _sendMessage = value;
                OnPropertyChanged();
            }
        }

        public string ReceivedMessage
        {
            get { return _receivedMessage; }
            set
            {
                if (value == _receivedMessage) return;
                _receivedMessage = value;
                OnPropertyChanged();
            }
        }
        
        public event PropertyChangedEventHandler PropertyChanged;

        [NotifyPropertyChangedInvocator]
        protected virtual void OnPropertyChanged([CallerMemberName] string propertyName = null)
        {
            PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
        }
    }
}

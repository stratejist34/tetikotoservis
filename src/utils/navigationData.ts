export const brands = [
    {
        name: 'Hyundai',
        slug: 'hyundai',
        color: 'blue',
        accentColor: '#002c5f',
        models: ['i10', 'i20', 'i30', 'Tucson', 'Accent', 'Bayon', 'Kona', 'Elantra']
    },
    {
        name: 'Kia',
        slug: 'kia',
        color: 'orange',
        accentColor: '#ea580c',
        models: ['Picanto', 'Rio', 'Cee\'d', 'Sportage', 'Stonic', 'Niro', 'Soul', 'Sorento']
    },
    {
        name: 'Toyota',
        slug: 'toyota',
        color: 'red',
        accentColor: '#eb0a1e',
        models: ['Corolla', 'Yaris', 'Auris', 'C-HR', 'RAV4', 'Hilux', 'Avensis', 'Verso']
    },
    {
        name: 'Nissan',
        slug: 'nissan',
        color: 'red',
        accentColor: '#c3002f',
        models: ['Micra', 'Juke', 'Qashqai', 'X-Trail', 'Navara', 'Pulsar']
    }
];

export const locations = [
    {
        name: 'Gebze',
        slug: 'gebze',
        distance: '15',
        direction: 'D-100 karayolu üzerinden',
        neighborhoods: ['Gebze Merkez', 'Çayırova', 'Darıca', 'Dilovası']
    },
    {
        name: 'Tuzla',
        slug: 'tuzla',
        distance: '5',
        direction: 'Küçük Sanayi Sitesi içerisinde',
        neighborhoods: ['Aydıntepe', 'İçmeler', 'Şifa', 'Mimarsinan']
    },
    {
        name: 'Pendik',
        slug: 'pendik',
        distance: '20',
        direction: 'E-5 üzerinden',
        neighborhoods: ['Pendik Merkez', 'Kaynarca', 'Güzelyalı', 'Esenyalı']
    },
    {
        name: 'Kurtköy',
        slug: 'kurtkoy',
        distance: '25',
        direction: 'Tem bağlantı yolu üzerinden',
        neighborhoods: ['Kurtköy Merkez', 'Yenişehir', 'Harmandere', 'Çamlık']
    }
];

export const navigationData = {
    brands,
    locations,
    menuItems: [
        { text: "ANASAYFA", href: "/" },
        { text: "HAKKIMIZDA", href: "/hakkimizda" },
        {
            text: "HİZMETLERİMİZ",
            href: "/hizmetlerimiz",
            hasDropdown: true,
            dropdownItems: brands.map(brand => ({
                text: `${brand.name.toUpperCase()} SERVİS`,
                slug: brand.slug,
                href: `/${brand.slug}-ozel-servis`,
                locations: locations.map(loc => ({
                    text: loc.name,
                    href: `/${loc.slug}-${brand.slug}-servis`
                }))
            }))
        },
        { text: "BLOG", href: "/blog" },
        { text: "İLETİŞİM", href: "/iletisim" },
    ]
};

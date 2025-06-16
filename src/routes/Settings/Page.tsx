import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Save, User, Bell, Shield, Palette } from "lucide-react"


export default function Settings() {
  const [isLoading, setIsLoading] = useState(false)
  const [settings, setSettings] = useState({
    pushNotifications: false,
    playSound: false
  })

  const handleSave = async () => {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
    console.log("Settings saved:", settings)
  }

  const updateSetting = (key: string, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  useEffect(() => {
    // TODO: add fetch settings from local database
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">
              Settings
            </h1>
            <p className="text-muted-foreground mt-2">Manage your account settings and preferences</p>
          </div>

          <div className="space-y-6">
            {/* Account Settings
            <Card className="border-slate-200 dark:border-slate-700 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="rounded-full bg-teal-100 dark:bg-teal-900/30 p-1.5">
                    <User className="h-4 w-4 text-teal-600 dark:text-teal-400" />
                  </div>
                  Account Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="displayName">Display Name</Label>
                    <Input
                      id="displayName"
                      value={settings.displayName}
                      onChange={(e) => updateSetting("displayName", e.target.value)}
                      className="border-slate-200 dark:border-slate-700 focus:border-teal-500 focus:ring-teal-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      value={settings.username}
                      onChange={(e) => updateSetting("username", e.target.value)}
                      className="border-slate-200 dark:border-slate-700 focus:border-teal-500 focus:ring-teal-500"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={settings.email}
                    onChange={(e) => updateSetting("email", e.target.value)}
                    className="border-slate-200 dark:border-slate-700 focus:border-teal-500 focus:ring-teal-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={settings.bio}
                    onChange={(e) => updateSetting("bio", e.target.value)}
                    className="border-slate-200 dark:border-slate-700 focus:border-teal-500 focus:ring-teal-500"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
            */}

            {/* Preferences             <Card className="border-slate-200 dark:border-slate-700 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="rounded-full bg-emerald-100 dark:bg-emerald-900/30 p-1.5">
                    <Palette className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="language">Language</Label>
                    <Select value={settings.language} onValueChange={(value) => updateSetting("language", value)}>
                      <SelectTrigger className="border-slate-200 dark:border-slate-700 focus:border-emerald-500 focus:ring-emerald-500">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                        <SelectItem value="de">German</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select value={settings.timezone} onValueChange={(value) => updateSetting("timezone", value)}>
                      <SelectTrigger className="border-slate-200 dark:border-slate-700 focus:border-emerald-500 focus:ring-emerald-500">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="UTC-8">Pacific Time (UTC-8)</SelectItem>
                        <SelectItem value="UTC-7">Mountain Time (UTC-7)</SelectItem>
                        <SelectItem value="UTC-6">Central Time (UTC-6)</SelectItem>
                        <SelectItem value="UTC-5">Eastern Time (UTC-5)</SelectItem>
                        <SelectItem value="UTC+0">UTC</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="theme">Theme</Label>
                    <Select value={settings.theme} onValueChange={(value) => updateSetting("theme", value)}>
                      <SelectTrigger className="border-slate-200 dark:border-slate-700 focus:border-emerald-500 focus:ring-emerald-500">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dateFormat">Date Format</Label>
                    <Select value={settings.dateFormat} onValueChange={(value) => updateSetting("dateFormat", value)}>
                      <SelectTrigger className="border-slate-200 dark:border-slate-700 focus:border-emerald-500 focus:ring-emerald-500">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                        <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                        <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
            */}

            <div className="flex w-full p-2 py-3 rounded-md text-white bg-zinc-950">
              <Label className="text-xl">Origin:</Label>
              <p className="text-lg text-teal-400 pl-1">{window.location.origin}</p>
            </div>

            {/* Notifications */}
            <Card className="border-slate-200 dark:border-slate-700 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="rounded-full bg-teal-100 dark:bg-teal-900/30 p-1.5">
                    <Bell className="h-4 w-4 text-teal-600 dark:text-teal-400" />
                  </div>
                  Notifications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="notifications">Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive push notifications in your app</p>
                  </div>
                  <Switch
                    id="notifications"
                    checked={settings.pushNotifications}
                    onCheckedChange={(checked) => updateSetting("pushNotifications", checked)}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="playSound">Play Sound</Label>
                    <p className="text-sm text-muted-foreground">Play a sound when task is completed</p>
                  </div>
                  <Switch
                    id="playSound"
                    checked={settings.playSound}
                    onCheckedChange={(checked) => updateSetting("weeklyDigest", checked)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Privacy
            <Card className="border-slate-200 dark:border-slate-700 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="rounded-full bg-emerald-100 dark:bg-emerald-900/30 p-1.5">
                    <Shield className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  Privacy & Security
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="profileVisibility">Profile Visibility</Label>
                  <Select
                    value={settings.profileVisibility}
                    onValueChange={(value) => updateSetting("profileVisibility", value)}
                  >
                    <SelectTrigger className="border-slate-200 dark:border-slate-700 focus:border-emerald-500 focus:ring-emerald-500">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Public</SelectItem>
                      <SelectItem value="friends">Friends Only</SelectItem>
                      <SelectItem value="private">Private</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="showEmail">Show Email Address</Label>
                    <p className="text-sm text-muted-foreground">Display your email on your public profile</p>
                  </div>
                  <Switch
                    id="showEmail"
                    checked={settings.showEmail}
                    onCheckedChange={(checked) => updateSetting("showEmail", checked)}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="showActivity">Show Activity Status</Label>
                    <p className="text-sm text-muted-foreground">Let others see when you're active</p>
                  </div>
                  <Switch
                    id="showActivity"
                    checked={settings.showActivity}
                    onCheckedChange={(checked) => updateSetting("showActivity", checked)}
                  />
                </div>
              </CardContent>
            </Card>
          */}
          </div>


          {/* Save Button */}
          <div className="flex justify-end mt-8">
            <Button
              onClick={handleSave}
              disabled={isLoading}
              className="bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white shadow-lg hover:shadow-xl transition-all duration-200"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
